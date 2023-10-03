import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import ora from "ora";
import chalk from "chalk";
import {getDirname, exec, hasYarn, recursiveDir, validTool} from "../utils.js";
import {Relies, TemplateStoreDirname} from "../constants.js";
import {execaSync} from "execa";
// import {installQues, pkgToolQues} from "../inquirers";
import { select } from '@inquirer/prompts';
import {pkgToolQues} from "../inquirers.js";
export default async function (templateName, options) {
  const spinner = ora(chalk.blue('初始化模版...')).start();
  // console.log('download', templateName, options);
  const { destination, cwd, pkgTool } = options;
  try {
    /*copySync(join(getDirname(), `../${TemplateStoreDirname}/${templateName}`), destination, {
      overwrite: false,
      errorOnExist: true
    });*/
    spinner.succeed('模版初始化成功');
    if (options.install) {
      installPkg(pkgTool, cwd);
    }
  } catch (error) {
    spinner.fail('模版初始化失败');
    console.log('download error>>>', error);
  }
}



async function installPkg(pkgTool, cwd) {
  // console.log('installPkg', pkgTool, cwd, process.cwd());
  let tool = pkgTool;
  if (!pkgTool) {
    tool = await select(pkgToolQues);
  }
  const cmd = validTool(tool);
  if (cmd) {
    // console.log('开始安装', tool);
    const spinner = ora(chalk.blue('正在安装依赖...')).start();
    try {
      // await exec(`${tool} add dayjs ejs`, { cwd });
      await execaSync(cmd, ['add'].concat(Relies), { cwd, stdio: 'inherit' });
      spinner.succeed(chalk.green('依赖安装成功'));
    } catch (error) {
      spinner.fail('依赖安装失败');
      console.log('download error>>>', error);
    }
  } else {
    console.log(chalk.red('未安装' + tool));
  }
}
