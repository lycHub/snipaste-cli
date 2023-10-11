import { copySync } from "fs-extra/esm";

const from = process.argv[2];
const to = process.argv[3];
// eg: pnpm run copy src/styles ../core/templates/globalStyles
if (from && to) {
  copySync(from, to);
}
