import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import ora from "ora";
import chalk from "chalk";
import {getDirname, exec, hasYarn, recursiveDir} from "../utils.js";
import { partition } from "lodash-es";
import template from 'art-template';
import {copySync} from "fs-extra/esm";
import {TemplateStoreDirname} from "../constants.js";

// import {installQues, pkgToolQues} from "../inquirers";
export default function (templateName, options) {
  const spinner = ora(chalk.blue('初始化模版...')).start();
  // console.log('download', templateName, options);
  const { destination, cwd } = options;
  try {
    /*copySync(join(getDirname(), `../${TemplateStoreDirname}/${templateName}`), destination, {
      overwrite: false,
      errorOnExist: true
    });*/
    spinner.succeed('模版初始化成功');
    installPkg('npm', cwd);
  } catch (error) {
    spinner.succeed('模版初始化失败');
    console.log('download error>>>', error);
  }
}



async function installPkg(pkgTool, cwd = './') {
  console.log('installPkg', pkgTool, cwd);
  let tool = pkgTool;
 /* if (!tool) {
    const answers = await inquirer.prompt([pkgToolQues]);
    tool = answers.pkgTool;
  }*/
  if (tool === 'yarn' && !hasYarn()) {
    console.log(chalk.red('请先安装yarn'));
  } else {
    const spinner = ora(chalk.blue('正在安装依赖...')).start();
    await exec(`${tool} add dayjs ejs'`, { cwd });
    spinner.succeed(chalk.green('项目创建成功'));
  }
}
