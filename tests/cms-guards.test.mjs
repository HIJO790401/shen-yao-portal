import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import {
  assertStudioMultipartRequest,
  assertStudioWriteRequest,
  readStudioJson,
  studioCoverUrl,
  studioDate,
  studioId,
  StudioRequestError,
} from "../app/studio-guard.ts";
import {
  managedCoverKeyFromUrl,
  matchesImageSignature,
  MAX_STUDIO_MULTIPART_BYTES,
} from "../app/studio-image.ts";

const origin = "https://studio.example";

function request(path, init = {}) {
  return new Request(`${origin}${path}`, init);
}

test("requires a strict same-origin browser write signal", () => {
  assert.throws(
    () => assertStudioWriteRequest(request("/api/studio/posts", { method: "POST" })),
    isStudioError(403),
  );
  assert.throws(
    () =>
      assertStudioWriteRequest(
        request("/api/studio/posts", {
          method: "POST",
          headers: { origin: "https://evil.example" },
        }),
      ),
    isStudioError(403),
  );
  assert.throws(
    () =>
      assertStudioWriteRequest(
        request("/api/studio/posts", {
          method: "POST",
          headers: { origin, "sec-fetch-site": "cross-site" },
        }),
      ),
    isStudioError(403),
  );
  assert.doesNotThrow(() =>
    assertStudioWriteRequest(
      request("/api/studio/posts", {
        method: "POST",
        headers: { origin, "sec-fetch-site": "same-origin" },
      }),
    ),
  );
});

test("reads only bounded JSON objects", async () => {
  const body = JSON.stringify({ title_zh: "測試" });
  const valid = request("/api/studio/posts", {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json; charset=utf-8",
      "content-length": String(Buffer.byteLength(body)),
    },
    body,
  });
  assert.deepEqual(await readStudioJson(valid), { title_zh: "測試" });

  await assert.rejects(
    readStudioJson(
      request("/api/studio/posts", {
        method: "POST",
        headers: { origin, "content-type": "text/plain" },
        body: "{}",
      }),
    ),
    isStudioError(415),
  );
  await assert.rejects(
    readStudioJson(
      request("/api/studio/posts", {
        method: "POST",
        headers: {
          origin,
          "content-type": "application/json",
          "content-length": "999",
        },
        body: "{}",
      }),
      32,
    ),
    isStudioError(413),
  );
  await assert.rejects(
    readStudioJson(
      request("/api/studio/posts", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify({ body: "x".repeat(100) }),
      }),
      32,
    ),
    isStudioError(413),
  );
  await assert.rejects(
    readStudioJson(
      request("/api/studio/posts", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: "[]",
      }),
    ),
    isStudioError(400),
  );
});

test("validates multipart type and declared size before parsing", () => {
  assert.doesNotThrow(() =>
    assertStudioMultipartRequest(
      request("/api/studio/upload", {
        method: "POST",
        headers: {
          origin,
          "content-type": "multipart/form-data; boundary=serene",
          "content-length": "128",
        },
      }),
      MAX_STUDIO_MULTIPART_BYTES,
    ),
  );
  assert.throws(
    () =>
      assertStudioMultipartRequest(
        request("/api/studio/upload", {
          method: "POST",
          headers: { origin, "content-type": "application/json" },
        }),
        MAX_STUDIO_MULTIPART_BYTES,
      ),
    isStudioError(415),
  );
  assert.throws(
    () =>
      assertStudioMultipartRequest(
        request("/api/studio/upload", {
          method: "POST",
          headers: {
            origin,
            "content-type": "multipart/form-data; boundary=serene",
            "content-length": String(MAX_STUDIO_MULTIPART_BYTES + 1),
          },
        }),
        MAX_STUDIO_MULTIPART_BYTES,
      ),
    isStudioError(413),
  );
});

test("accepts only positive safe IDs and strict calendar datetimes", () => {
  assert.equal(studioId(7, true), 7);
  assert.equal(studioId("42"), 42);
  assert.equal(studioId(""), undefined);
  for (const value of [0, -1, 1.2, Number.NaN, Number.POSITIVE_INFINITY, "abc"]) {
    assert.throws(() => studioId(value, true), isStudioError(400));
  }

  assert.equal(studioDate("2026-07-28T23:59", "發布時間"), "2026-07-28T23:59");
  assert.equal(
    studioDate("2026-07-28T23:59:30+08:00", "發布時間"),
    "2026-07-28T15:59:30.000Z",
  );
  for (const value of ["1", "2026-02-30T12:00", "2026-13-01T12:00", "not-date"]) {
    assert.throws(() => studioDate(value, "發布時間"), isStudioError(400));
  }
});

test("allows only generated managed covers, safe local media, or credential-free HTTPS", () => {
  const managed =
    "/api/media/covers/1785000000000-123e4567-e89b-42d3-a456-426614174000.webp";
  assert.equal(studioCoverUrl(managed), managed);
  assert.equal(
    managedCoverKeyFromUrl(managed),
    "covers/1785000000000-123e4567-e89b-42d3-a456-426614174000.webp",
  );
  assert.equal(
    studioCoverUrl("/media/newsroom/report-cover.webp"),
    "/media/newsroom/report-cover.webp",
  );
  assert.equal(
    studioCoverUrl("https://cdn.example.com/covers/a.webp"),
    "https://cdn.example.com/covers/a.webp",
  );
  for (const value of [
    "/api/media/covers/%2e%2e/upload",
    "/media/newsroom/%2e%2e/secret",
    "https://user:secret@example.com/a.jpg",
    "data:image/png;base64,AAAA",
  ]) {
    assert.throws(() => studioCoverUrl(value), isStudioError(400));
  }
});

test("rejects truncated image headers and accepts structurally complete image containers", () => {
  assert.equal(matchesImageSignature("image/jpeg", new Uint8Array([0xff, 0xd8, 0xff])), false);
  assert.equal(matchesImageSignature("image/png", pngBytes().slice(0, 8)), false);
  assert.equal(matchesImageSignature("image/webp", webpBytes().slice(0, 12)), false);

  assert.equal(matchesImageSignature("image/jpeg", jpegBytes()), true);
  assert.equal(matchesImageSignature("image/png", pngBytes()), true);
  assert.equal(matchesImageSignature("image/webp", webpBytes()), true);
  assert.equal(matchesImageSignature("image/svg+xml", pngBytes()), false);
});

test("applies all Drizzle migrations to a blank database with publication indexes", async () => {
  const migrationDirectory = new URL("../drizzle/", import.meta.url);
  const names = (await readdir(migrationDirectory))
    .filter((name) => name.endsWith(".sql"))
    .sort();
  assert.ok(names.length >= 3, "expected the index migration after the two table migrations");

  const database = new DatabaseSync(":memory:");
  try {
    for (const name of names) {
      const sql = await readFile(new URL(name, migrationDirectory), "utf8");
      database.exec(sql.replaceAll("--> statement-breakpoint", ""));
    }
    const indexes = database
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND name IN (?, ?) ORDER BY name",
      )
      .all("museum_entries_status_date_idx", "news_posts_status_date_idx")
      .map((row) => row.name);
    assert.deepEqual(indexes, [
      "museum_entries_status_date_idx",
      "news_posts_status_date_idx",
    ]);
  } finally {
    database.close();
  }
});

test("reapplies the index migration after runtime bootstrap created the indexes", async () => {
  const migrationDirectory = new URL("../drizzle/", import.meta.url);
  const names = (await readdir(migrationDirectory))
    .filter((name) => name.endsWith(".sql"))
    .sort();
  const database = new DatabaseSync(":memory:");
  try {
    for (const name of names.slice(0, -1)) {
      const sql = await readFile(new URL(name, migrationDirectory), "utf8");
      database.exec(sql.replaceAll("--> statement-breakpoint", ""));
    }
    database.exec(
      "CREATE INDEX IF NOT EXISTS museum_entries_status_date_idx ON museum_entries (status, occurred_at DESC)",
    );
    database.exec(
      "CREATE INDEX IF NOT EXISTS news_posts_status_date_idx ON news_posts (status, published_at DESC)",
    );

    const indexMigration = await readFile(
      new URL(names.at(-1), migrationDirectory),
      "utf8",
    );
    assert.doesNotThrow(() =>
      database.exec(indexMigration.replaceAll("--> statement-breakpoint", "")),
    );
  } finally {
    database.close();
  }
});

function isStudioError(status) {
  return (error) =>
    error instanceof StudioRequestError &&
    error.status === status;
}

function jpegBytes() {
  return new Uint8Array([
    0xff, 0xd8,
    0xff, 0xe0, 0x00, 0x04, 0x00, 0x00,
    0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00,
    0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f, 0x00,
    0x00, 0xff, 0xd9,
  ]);
}

function pngBytes() {
  return new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ...pngChunk("IHDR", [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]),
    ...pngChunk("IDAT", [0x78, 0x01]),
    ...pngChunk("IEND", []),
  ]);
}

function pngChunk(type, data) {
  const length = data.length;
  return [
    (length >>> 24) & 0xff,
    (length >>> 16) & 0xff,
    (length >>> 8) & 0xff,
    length & 0xff,
    ...Array.from(type, (value) => value.charCodeAt(0)),
    ...data,
    0, 0, 0, 0,
  ];
}

function webpBytes() {
  const data = [0x2f, 0x00, 0x00, 0x00, 0x00];
  const bytes = [
    ...Array.from("RIFF", (value) => value.charCodeAt(0)),
    0, 0, 0, 0,
    ...Array.from("WEBP", (value) => value.charCodeAt(0)),
    ...Array.from("VP8L", (value) => value.charCodeAt(0)),
    data.length, 0, 0, 0,
    ...data,
    0,
  ];
  const riffSize = bytes.length - 8;
  bytes[4] = riffSize & 0xff;
  bytes[5] = (riffSize >>> 8) & 0xff;
  bytes[6] = (riffSize >>> 16) & 0xff;
  bytes[7] = (riffSize >>> 24) & 0xff;
  return new Uint8Array(bytes);
}
