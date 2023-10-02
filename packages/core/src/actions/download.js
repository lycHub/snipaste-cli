import ora from "ora";
import chalk from "chalk";
import {exec, hasYarn, recursiveDir} from "../utils.js";
import { partition } from "lodash-es";
import template from 'art-template';
import inquirer from 'inquirer';
import {unlinkSync, writeFileSync} from "node:fs";
// import {installQues, pkgToolQues} from "../inquirers";
export default async function (templateName, options) {
  // const spinner = ora(chalk.blue('初始化模版...')).start();
  // console.log('download', templateName, options);
  console.log('download>>>', templateName, options);
}



/*async function installPkg(pkgTool, cwd) {
  let tool = pkgTool;
  if (!tool) {
    const answers = await inquirer.prompt([pkgToolQues]);
    tool = answers.pkgTool;
  }
  if (tool === 'yarn' && !hasYarn()) {
    console.log(chalk.red('请先安装yarn'));
  } else {
    const spinner = ora(chalk.blue('正在安装依赖...')).start();
    await exec(tool + ' install', { cwd });
    spinner.succeed(chalk.green('项目创建成功'));
  }
}*/
