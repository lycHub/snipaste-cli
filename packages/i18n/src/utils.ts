import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { uid } from "uid";
import { parse, Lang } from "@ast-grep/napi";
import { MsgObj } from "./typing.js";
import { compact } from "es-toolkit";
import { outputFileSync } from "fs-extra/esm";

export function getDirname(importMetaUrl: string) {
  return dirname(fileURLToPath(importMetaUrl));
}

export function textToObject(text: string) {
  return {
    key: uid(),
    text,
  };
}

export function writeToJsonFile(
  contentStr: string | MsgObj[],
  filePath: string
) {
  console.log("writeToJsonFile", contentStr, filePath);
  const jsonContent =
    typeof contentStr === "string"
      ? contentStr
      : JSON.stringify(contentStr, null, 2);
  outputFileSync(filePath, jsonContent);
}

export async function readFileContent(filePath: string) {
  const texts: string[] = [];
  try {
    const source = await readFile(filePath, "utf-8");
    // console.log(content);
    const ast = parse(Lang.JavaScript, source);
    const root = ast.root();
    const nodes = root.findAll('t("$A")');
    nodes.forEach((node) => {
      const text = node?.getMatch("A")?.text() || "";
      texts.push(text);
    });
  } catch (err) {
    console.error("读取文件出错:", err);
    throw err;
  }
  return compact(texts);
}
