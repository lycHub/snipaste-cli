import ora from "ora";
import chalk from "chalk";
import {
  getDirname,
  readFileContent,
  textToObject,
  writeToJsonFile,
} from "../utils.js";
import { glob } from "glob";
import { resolve, join } from "node:path";
import { compact, uniq } from "es-toolkit";
import { MsgObj } from "../typing.js";

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
const basePath = getDirname(import.meta.url);
export default async function (options: ExtractOptions) {
  const mergedOptions = { ...DefaultOptions, ...options };
  const spinner = ora(chalk.blue("extracting...")).start();
  console.log("extract", mergedOptions);

  try {
    const tsxFilePaths = await glob(mergedOptions.source, {
      cwd: mergedOptions.cwd,
    });
    // console.log("tsxFilePaths>>>", tsxFilePaths);
    const allTexts: string[] = [];
    if (tsxFilePaths.length) {
      const promises = tsxFilePaths.map((path) =>
        readFileContent(join(mergedOptions.cwd, path))
      );
      for await (const texts of promises) {
        allTexts.push(...texts);
      }
    }
    const validTexts = uniq(compact(allTexts));
    const jsonText = validTexts.map((item) => textToObject(item));
    // console.log("validTexts>>> ", jsonText);
    await writeToJsonFile(
      jsonText,
      join(mergedOptions.cwd, mergedOptions.dest)
    );
    spinner.succeed("提取成功");
  } catch (error) {
    console.error("提取失败:", error);
    throw error;
  }
}
