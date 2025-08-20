import chalk from "chalk";
import template from "art-template";
import { kebabCase } from "lodash-es";
import {join} from "node:path";
import {readdirSync} from "node:fs";
import {getDirname} from "../utils.js";
import {SnipStoreDirname} from "../constants.js";
import {outputFileSync, pathExistsSync} from "fs-extra/esm";
import {frameQues} from "../inquirers.js";
import {select} from "@inquirer/prompts";

export default async function (name, { frame }) {
  console.log('add component', name);
  let basePath = 'components';
  let trueName = name;
  const data = name.split('/');
  if (data.length > 1) {
    trueName = data.pop();
    basePath = data.join('/');
  }
  // console.log('trueName', trueName, basePath);

  try {
    let framework = frame;
    if (!frame) {
      framework = await select(frameQues);
    }
    const snipPath = join(getDirname(), `../${SnipStoreDirname}/component/${framework}`);
    if (pathExistsSync(snipPath)) {
      const dest = `src/${basePath}/${trueName}`;
      // console.log('dest', dest);
      const files = readdirSync(snipPath);
      // console.log('files', files);
      files.forEach(file => {
        const content = template(snipPath + '/' + file, { name: trueName, rootCls: kebabCase(trueName) });
        outputFileSync(`${dest}/${file}`, content);
      });
      console.log(chalk.green('创建成功>>', dest));
    } else {
      console.log(chalk.red('Frame is inValid, it only can be "react"、"vue3"'));
    }

  } catch (e) {
    console.log(chalk.red('创建失败'));
    throw e;
  }
}
