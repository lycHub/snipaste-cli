import { Command } from "commander";
import { readJsonSync } from "fs-extra/esm";
import { fileURLToPath } from "node:url";
import extract from "./actions/extract.js";
import trans from "./actions/trans.js";
import { OptionsMeta } from "./constants.js";

let json;
try {
  const path = fileURLToPath(new URL("../package.json", import.meta.url));
  json = readJsonSync(path);
  // console.log('json>>', json);
} catch (error) {
  console.error("parse package.json error", error);
}

const { extractTarget, extractDest, cwd, resourcePath, tranDest } = OptionsMeta;

if (json?.version) {
  const program = new Command("i18n");
  program
    .description("Automatically extract and generate i18n resources")
    .version(json.version);
  program.addCommand(extractCommand(Command));
  program.addCommand(genCommand(Command));
  program.addHelpText(
    "after",
    `
  Example extract all resource:
    $ i18n
`
  );

  program.parse();
}

function extractCommand(Cond: typeof Command) {
  const generate = new Cond("extract");
  generate
    .description("Extract i18n resources")
    .option(
      `-${extractTarget.shortOption} --${extractTarget.option} [value]`,
      extractTarget.description,
      extractTarget.default
    )
    .option(
      `-${extractDest.shortOption} --${extractDest.option} [value]`,
      extractDest.description,
      extractDest.default
    )
    .option(`--${cwd.option} [value]`, cwd.description, cwd.default)
    .action(extract);

  return generate;
}

function genCommand(Cond: typeof Command) {
  const generate = new Cond("gen");
  generate
    .description("Generate i18n data according to resource")
    .option(
      `-${resourcePath.shortOption} --${resourcePath.option} [value]`,
      resourcePath.description,
      resourcePath.default
    )
    .option(
      `-${tranDest.shortOption} --${tranDest.option} [value]`,
      tranDest.description,
      tranDest.default
    )
    .option(`--${cwd.option} [value]`, cwd.description, cwd.default)
    .action(trans);

  return generate;
}
