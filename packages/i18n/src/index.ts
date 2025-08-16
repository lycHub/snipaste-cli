import { Command } from "commander";
import { readJsonSync } from "fs-extra/esm";
import { fileURLToPath } from "node:url";
import extract from "./actions/extract.js";
import { OptionsMeta } from "./constants.js";

let json;
try {
  const path = fileURLToPath(new URL("../package.json", import.meta.url));
  json = readJsonSync(path);
  // console.log('json>>', json);
} catch (error) {
  console.error("parse package.json error", error);
}

const { source, dest, cwd } = OptionsMeta;

if (json?.version) {
  const program = new Command("i18n");
  program
    .description("Automatically extract and generate i18n resources")
    .version(json.version);
  program.addCommand(childCommands(Command));
  program.addHelpText(
    "after",
    `
  Example extract all resource:
    $ i18n
`
  );

  program.parse();
}

function childCommands(Cond: typeof Command) {
  const generate = new Cond("extract");
  generate
    .description("Extract i18n resources")
    .option(`--${source.option} [value]`, source.description, source.default)
    .option(`--${dest.option} [value]`, dest.description, dest.default)
    .option(`--${cwd.option} [value]`, cwd.description, cwd.default)
    .action(extract);

  return generate;
}
