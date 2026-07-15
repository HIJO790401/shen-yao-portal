/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
    DB: D1Database;
    MEDIA: R2Bucket;
  }
}

declare module "cloudflare:workers" {
  interface Env {
    DB: D1Database;
    MEDIA: R2Bucket;
  }
}

export {};
