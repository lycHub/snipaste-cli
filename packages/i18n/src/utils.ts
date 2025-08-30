import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { uid } from "uid";
import { parse, Lang } from "@ast-grep/napi";
import { compact, isPlainObject } from "es-toolkit";
import { outputFileSync } from "fs-extra/esm";
import { pathToFileURL } from "node:url";
import { DefaultConfig } from "./constants.js";
import destr from "destr";

export function getDirname(importMetaUrl: string) {
  return dirname(fileURLToPath(importMetaUrl));
}

export function textToObject(text: string) {
  return {
    key: uid(),
    text,
  };
}

export function writeToJsonFile(contentStr: string | object, filePath: string) {
  const jsonContent =
    typeof contentStr === "string"
      ? contentStr
      : JSON.stringify(contentStr, null, 2);
  outputFileSync(filePath, jsonContent);
}

export async function readFileContent(filePath: string) {
  try {
    const content = await readFile(filePath, "utf-8");
    const extractJson = destr(content);
    return extractJson;
  } catch (err) {
    console.error("读取文件出错:", err);
  }
  return [];
}

export async function extractFileContent(filePath: string) {
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

interface LoadConfigParams {
  path: string;
}

export async function loadConfig({ path }: LoadConfigParams) {
  try {
    const config = await import(pathToFileURL(path).href);
    // console.log(config.default);
    if (isPlainObject(config.default)) {
      return { ...DefaultConfig, ...config.default };
    }
  } catch (error) {
    return DefaultConfig;
  }
}
