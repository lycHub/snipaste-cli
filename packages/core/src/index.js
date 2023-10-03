import { program } from 'commander';
import {OptionsMeta} from "./constants.js";
import download from "./actions/download.js";
import {readJsonSync} from "fs-extra/esm";
import {fileURLToPath} from "node:url";
// import childCommand from "./childCommand";

let json;
try {
  const path = fileURLToPath(new URL('../package.json', import.meta.url));
  json = readJsonSync(path);
  // console.log('json>>', json);
} catch (error) {
  console.error('parse package.json error', error);
}

const { destination, install, pkgTool, cwd } = OptionsMeta;

if (json?.version) {
  program
    .name('sc')
    .description('Frontend snip cli')
    .version(json.version)
    .usage('download <templateName> [options]')
    .command('download', '下载模板')
    .argument('<templateName>', '选择模板')
    .option(`-${destination.shotOption} --${destination.option} [value]`, destination.description, destination.default)
    .option(`-${install.shotOption} --${install.option} [value]`, install.description, install.default)
    .option(`-${pkgTool.shotOption} --${pkgTool.option} [value]`, pkgTool.description, pkgTool.default)
    .option(`--${cwd.option} [value]`, cwd.description, cwd.default)
    .action(download);

// program.addCommand(childCommand(Command));

  program.addHelpText('after', `
  Example download a template:
    $ sc antdPro
`);

  program.parse();
}

