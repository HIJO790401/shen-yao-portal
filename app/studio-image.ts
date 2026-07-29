export const STUDIO_IMAGE_TYPES = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export const MAX_STUDIO_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_STUDIO_MULTIPART_BYTES =
  MAX_STUDIO_IMAGE_BYTES + 128 * 1024;

const managedCoverPattern =
  /^\/api\/media\/(covers\/\d{10,16}-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp))$/i;

export function managedCoverKeyFromUrl(value: string): string | null {
  const match = managedCoverPattern.exec(value);
  return match?.[1] ?? null;
}

export function matchesImageSignature(
  type: string,
  bytes: Uint8Array,
): boolean {
  if (type === "image/jpeg") return matchesJpeg(bytes);
  if (type === "image/png") return matchesPng(bytes);
  if (type === "image/webp") return matchesWebp(bytes);
  return false;
}

function matchesJpeg(bytes: Uint8Array): boolean {
  if (
    bytes.length < 32 ||
    bytes[0] !== 0xff ||
    bytes[1] !== 0xd8 ||
    bytes.at(-2) !== 0xff ||
    bytes.at(-1) !== 0xd9
  ) {
    return false;
  }

  let offset = 2;
  let sawFrame = false;
  while (offset + 3 < bytes.length - 2) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset];
    offset += 1;

    if (marker === 0xda) return sawFrame;
    if (marker === 0xd9) return sawFrame;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 1 >= bytes.length) return false;

    const segmentLength = (bytes[offset] << 8) | bytes[offset + 1];
    if (segmentLength < 2 || offset + segmentLength > bytes.length - 2) {
      return false;
    }
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      if (segmentLength < 8) return false;
      const height = (bytes[offset + 3] << 8) | bytes[offset + 4];
      const width = (bytes[offset + 5] << 8) | bytes[offset + 6];
      if (!width || !height) return false;
      sawFrame = true;
    }
    offset += segmentLength;
  }
  return false;
}

function matchesPng(bytes: Uint8Array): boolean {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (
    bytes.length < 57 ||
    !signature.every((value, index) => bytes[index] === value)
  ) {
    return false;
  }

  let offset = signature.length;
  let chunkIndex = 0;
  let sawImageData = false;
  while (offset + 12 <= bytes.length) {
    const length = readUint32BigEndian(bytes, offset);
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > bytes.length) return false;
    const type = ascii(bytes, offset + 4, 4);

    if (chunkIndex === 0) {
      if (type !== "IHDR" || length !== 13) return false;
      const width = readUint32BigEndian(bytes, offset + 8);
      const height = readUint32BigEndian(bytes, offset + 12);
      if (!width || !height) return false;
    }
    if (type === "IDAT") {
      if (length === 0) return false;
      sawImageData = true;
    }
    if (type === "IEND") {
      return length === 0 && sawImageData && chunkEnd === bytes.length;
    }

    offset = chunkEnd;
    chunkIndex += 1;
  }
  return false;
}

function matchesWebp(bytes: Uint8Array): boolean {
  if (
    bytes.length < 26 ||
    ascii(bytes, 0, 4) !== "RIFF" ||
    ascii(bytes, 8, 4) !== "WEBP" ||
    readUint32LittleEndian(bytes, 4) + 8 !== bytes.length
  ) {
    return false;
  }

  let offset = 12;
  let sawImageChunk = false;
  while (offset + 8 <= bytes.length) {
    const type = ascii(bytes, offset, 4);
    const length = readUint32LittleEndian(bytes, offset + 4);
    const dataOffset = offset + 8;
    const chunkEnd = dataOffset + length;
    const paddedEnd = chunkEnd + (length % 2);
    if (chunkEnd > bytes.length || paddedEnd > bytes.length) return false;

    if (type === "VP8 ") {
      if (
        length < 10 ||
        bytes[dataOffset + 3] !== 0x9d ||
        bytes[dataOffset + 4] !== 0x01 ||
        bytes[dataOffset + 5] !== 0x2a
      ) {
        return false;
      }
      const width =
        ((bytes[dataOffset + 7] << 8) | bytes[dataOffset + 6]) & 0x3fff;
      const height =
        ((bytes[dataOffset + 9] << 8) | bytes[dataOffset + 8]) & 0x3fff;
      if (!width || !height) return false;
      sawImageChunk = true;
    } else if (type === "VP8L") {
      if (length < 5 || bytes[dataOffset] !== 0x2f) return false;
      const width =
        1 + bytes[dataOffset + 1] + ((bytes[dataOffset + 2] & 0x3f) << 8);
      const height =
        1 +
        (bytes[dataOffset + 2] >> 6) +
        (bytes[dataOffset + 3] << 2) +
        ((bytes[dataOffset + 4] & 0x0f) << 10);
      if (!width || !height) return false;
      sawImageChunk = true;
    } else if (type === "VP8X") {
      if (length !== 10) return false;
      const width = 1 + readUint24LittleEndian(bytes, dataOffset + 4);
      const height = 1 + readUint24LittleEndian(bytes, dataOffset + 7);
      if (!width || !height) return false;
    }

    offset = paddedEnd;
  }
  return sawImageChunk && offset === bytes.length;
}

function ascii(bytes: Uint8Array, offset: number, length: number): string {
  return String.fromCharCode(...bytes.slice(offset, offset + length));
}

function readUint24LittleEndian(bytes: Uint8Array, offset: number): number {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16)
  );
}

function readUint32BigEndian(bytes: Uint8Array, offset: number): number {
  return (
    bytes[offset] * 0x1000000 +
    (bytes[offset + 1] << 16) +
    (bytes[offset + 2] << 8) +
    bytes[offset + 3]
  );
}

function readUint32LittleEndian(bytes: Uint8Array, offset: number): number {
  return (
    bytes[offset] +
    (bytes[offset + 1] << 8) +
    (bytes[offset + 2] << 16) +
    bytes[offset + 3] * 0x1000000
  );
}
