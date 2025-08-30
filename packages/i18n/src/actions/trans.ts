import ora from "ora";
import chalk from "chalk";
import { loadConfig, readFileContent, writeToJsonFile } from "../utils.js";
import { join, resolve } from "node:path";
import { DefaultConfig } from "../constants.js";
import { I18nConfig, MsgObj } from "../typing.js";
import { TencentCloud } from "../translate/tencent.js";
import { pickBy } from "es-toolkit";

let tencentInstance: TencentCloud;

async function makeLangJson({
  extractJson,
  lang,
  mainLang,
  config,
}: {
  extractJson: MsgObj[];
  lang: string;
  mainLang: string;
  config: I18nConfig;
}) {
  let jsonText: Record<string, string> = {};
  if (mainLang === lang) {
    jsonText = extractJson.reduce((res, item) => {
      res[item.text] = item.text;
      return res;
    }, {} as Record<string, string>);
  } else {
    const textList = extractJson.map((item) => item.text);
    const { TargetTextList } = await tencentInstance.batchTranslateText({
      ...(config.tencent?.translateParams || { ProjectId: 0 }),
      Source: mainLang,
      Target: lang,
      SourceTextList: textList,
    });
    if (TargetTextList?.length) {
      jsonText = extractJson.reduce((res, item, index) => {
        res[item.text] = TargetTextList[index] || item.text;
        return res;
      }, {} as Record<string, string>);
    }
  }

  // console.log("makeLangJson>>", lang, jsonText);
  await writeToJsonFile(jsonText, join(config.tranDest, `${lang}.json`));
  console.log("gen i18n success");
}

export default async function (config: I18nConfig) {
  const cwd = config.cwd || DefaultConfig.cwd;
  const fileConfig = await loadConfig({ path: resolve(cwd, "i18n.config.js") });
  const mergedConfig: I18nConfig = {
    ...DefaultConfig,
    ...pickBy(fileConfig, Boolean),
    ...pickBy(config, Boolean),
  };
  // console.log("trans", mergedConfig);
  // return;
  const spinner = ora(chalk.blue("translating...")).start();
  try {
    const extractJson = (await readFileContent(
      join(mergedConfig.cwd, mergedConfig.resourcePath)
    )) as MsgObj[];
    // console.log("extractJson>>>", extractJson);

    if (extractJson.length && mergedConfig.tencent) {
      tencentInstance = new TencentCloud(mergedConfig.tencent.config);
      mergedConfig.langs.forEach((lang) => {
        makeLangJson({
          lang,
          extractJson,
          mainLang: mergedConfig.mainLang,
          config: mergedConfig,
        });
      });
    }

    spinner.succeed("提取成功");
  } catch (error) {
    console.error("提取失败:", error);
    throw error;
  }
}
