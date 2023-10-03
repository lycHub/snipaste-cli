import { program } from 'commander';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import {OptionsMeta} from "./constants.js";
import download from "./actions/download.js";
// import childCommand from "./childCommand";

const pkgJsonStr = readFileSync(new URL('../package.json', import.meta.url), 'utf-8');
let json;
try {
  json = JSON.parse(pkgJsonStr);
} catch (error) {
  console.error('parse package.json error', error);
}

const { destination, install, pkgTool } = OptionsMeta;

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
  .action(download);

// program.addCommand(childCommand(Command));

program.addHelpText('after', `
  Example download a template:
    $ sc antdPro
`);

program.parse();

// console.log('start index', import.meta.url, fileURLToPath(import.meta.url));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

