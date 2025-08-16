export const OptionsMeta = {
  source: {
    key: "source",
    description: "目标文件",
    default: "**/*.{ts,js,jsx,tsx}",
    option: "source",
  },
  dest: {
    key: "dest",
    description: "下载目录",
    default: "i18n/resource.json",
    option: "dest",
  },
  cwd: {
    key: "cwd",
    description: "执行目录",
    default: process.cwd(),
    option: "cwd",
    shotOption: "",
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
