import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

export function getDirname() {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}
