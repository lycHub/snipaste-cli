import { join } from "node:path";
import ora from "ora";
import chalk from "chalk";
import { Relies, TemplateStoreDirname } from "../constants.js";
import { execaSync } from "execa";
import { select } from "@inquirer/prompts";
import { copySync, pathExistsSync } from "fs-extra/esm";
import { getDirname } from "../utils.js";

interface ExtractOptions {
  source: string;
  dest: string;
  cwd: string;
}

const DefaultOptions: ExtractOptions = {
  source: "**/*.{ts,js,jsx,tsx}",
  dest: "i18n/resource.json",
  cwd: process.cwd(),
};

export default async function (options: ExtractOptions) {
  const mergedOptions = { ...DefaultOptions, ...options };
  const spinner = ora(chalk.blue("extracting...")).start();
  console.log("extract", mergedOptions);
  spinner.succeed("提取成功");

  /* 
   const tplPath = join(
      getDirname(),
      `../${TemplateStoreDirname}${templatePath}`
    );
  */
  try {
  } catch (error) {
    spinner.fail("模版初始化失败");
    console.log("extract error>>>", error);
  }
}
