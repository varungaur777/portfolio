import fs from "node:fs";
import path from "node:path";
import type { Asset } from "./types";

/**
 * Build-time check: does this file exist in /public?
 * The site is statically exported, so this runs once during `npm run build`.
 * Missing files render as a dark placeholder that names the expected file.
 */
export function has(publicPath?: string): boolean {
  if (!publicPath) return false;
  return fs.existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}

/** Returns the path if the file exists, otherwise undefined. */
export function ifExists(publicPath?: string): string | undefined {
  return has(publicPath) ? publicPath : undefined;
}

export type { Asset };

/** Wrap a public path with its build-time availability. */
export function asset(publicPath: string): Asset {
  return { src: publicPath, ok: has(publicPath) };
}
