import { Command } from 'commander';
import {OptionsMeta} from "./constants.js";
import download from "./actions/download.js";
import {readJsonSync} from "fs-extra/esm";
import {fileURLToPath} from "node:url";
import addComponent from "./actions/addComponent.js";
import addDirective from "./actions/addDirective.js";
// import childCommand from "./childCommand";

let json;
try {
  const path = fileURLToPath(new URL('../package.json', import.meta.url));
  json = readJsonSync(path);
  // console.log('json>>', json);
} catch (error) {
  console.error('parse package.json error', error);
}

const { destination, install, pkgTool, cwd,frame } = OptionsMeta;

if (json?.version) {
  const program = new Command('sc');
  program
    .description('Frontend snip cli')
    .version(json.version)
    .usage('<templateName> [options]')
    .argument('<templateName>', '选择模板')
    .option(`-${destination.shotOption} --${destination.option} [value]`, destination.description, destination.default)
    .option(`-${install.shotOption} --${install.option} [value]`, install.description, install.default)
    .option(`-${pkgTool.shotOption} --${pkgTool.option} [value]`, pkgTool.description, pkgTool.default)
    .option(`--${cwd.option} [value]`, cwd.description, cwd.default)
    .action(download);

  program.addCommand(childCommands(Command));

  program.addHelpText('after', `
  Example download a template:
    $ sc antdPro
`);

  program.parse();
}



function childCommands(Command) {
  const generate = new Command('add');
  generate
    .command('c <name>')
    .description('添加一个组件')
    .usage('add c <name>')
    .option(`--${frame.option} [value]`, frame.description, frame.default)
    .action(addComponent);

  generate
    .command('d <name>')
    .description('添加一个指令')
    .usage('add d <name>')
    .option(`--${frame.option} [value]`, frame.description, 'vue3')
    .action(addDirective);

  return generate;
}
