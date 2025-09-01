import ora from "ora";
import chalk from "chalk";
import {
  loadConfig,
  extractFileContent,
  textToObject,
  writeToJsonFile,
} from "../utils.js";
import { glob } from "glob";
import { join, resolve } from "node:path";
import { compact, uniq } from "es-toolkit";
import { DefaultConfig } from "../constants.js";
import { I18nConfig } from "../typing.js";

// const basePath = getDirname(import.meta.url);
export default async function (config: I18nConfig) {
  const cwd = config.cwd || DefaultConfig.cwd;
  const configObj = await loadConfig({ path: resolve(cwd, "i18n.config.js") });
  const mergedConfig = { ...DefaultConfig, ...configObj, ...config };
  // console.log("extract>>", mergedConfig);
  const spinner = ora(chalk.blue("extracting...")).start();
  try {
    const tsxFilePaths = await glob(mergedConfig.extractTarget, {
      cwd: mergedConfig.cwd,
    });
    console.log("tsxFilePaths>>>", tsxFilePaths);
    const allTexts: string[] = [];
    if (tsxFilePaths.length) {
      const promises = tsxFilePaths.map((path) =>
        extractFileContent(join(mergedConfig.cwd, path))
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
      join(mergedConfig.cwd, mergedConfig.extractDest)
    );
    spinner.succeed("提取成功");
  } catch (error) {
    console.error("提取失败:", error);
    throw error;
  }
}
