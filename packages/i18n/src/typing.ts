export interface MsgObj {
  key: string;
  text: string;
}

export interface I18nConfig {
  cwd: string;
  extractTarget: string;
  extractDest: string;
  langs: string[];
  mainLang: string;

  resourcePath: string;
  tranTarget: string;
}
