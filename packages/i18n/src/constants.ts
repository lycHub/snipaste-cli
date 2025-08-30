import { I18nConfig } from "./typing.js";

export const OptionsMeta = {
  cwd: {
    key: "cwd",
    description: "执行目录",
    default: process.cwd(),
    option: "cwd",
    shotOption: "",
  },
  extractTarget: {
    key: "extractTarget",
    description: "目标文件",
    default: "**/*.{ts,js,jsx,tsx}",
    option: "extractTarget",
    shortOption: "et",
  },
  extractDest: {
    key: "extractDest",
    description: "下载目录",
    default: "i18n/resource.json",
    option: "extractDest",
    shortOption: "ed",
  },

  resourcePath: {
    key: "resourcePath",
    description: "目标文件",
    default: "i18n/resource.json",
    option: "resourcePath",
    shortOption: "rp",
  },
  tranDest: {
    key: "tranDestDir",
    description: "翻译结果存放目录",
    default: "",
    option: "tranDest",
    shortOption: "td",
  },
};

export const TemplateStoreDirname = "templates";
export const SnipStoreDirname = "snips";
export const Relies = [
  "@dnd-kit/core",
  "@dnd-kit/modifiers",
  "@dnd-kit/sortable",
  "@dnd-kit/utilities",
  "ahooks",
  "lodash-es",
];

const Langs = ["zh", "en"];

export const DefaultConfig: I18nConfig = {
  cwd: process.cwd(),
  extractTarget: "**/*.{ts,js,jsx,tsx}",
  extractDest: "i18n/resource.json",
  langs: Langs,
  mainLang: Langs[0],
  resourcePath: "",
  tranDest: "i18n",
};
