import * as TencentCloudCommon from "tencentcloud-sdk-nodejs-common";
import { TextTranslateBatchRequest } from "tencentcloud-sdk-nodejs-tmt/tencentcloud/services/tmt/v20180321/tmt_models.js";
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
  tranDest: string;

  tencent?: {
    config: TencentCloudCommon.ClientConfig;
    translateParams: TextTranslateBatchRequest;
  };
}
