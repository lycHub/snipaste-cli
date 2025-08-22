import tencentcloud from "tencentcloud-sdk-nodejs-tmt";
import * as TencentCloudCommon from "tencentcloud-sdk-nodejs-common";
import {
  TextTranslateBatchRequest,
  TextTranslateRequest,
} from "tencentcloud-sdk-nodejs-tmt/tencentcloud/services/tmt/v20180321/tmt_models.js";
import { Client } from "tencentcloud-sdk-nodejs-tmt/tencentcloud/services/tmt/v20180321/tmt_client.js";

const TmtClient = tencentcloud.tmt.v20180321.Client;

export class TencentCloud {
  readonly #client: Client;
  constructor(config: TencentCloudCommon.ClientConfig) {
    this.#client = new TmtClient(config);
  }
  translateSingleText(params: TextTranslateRequest) {
    return this.#client.TextTranslate(params);
  }
  batchTranslateText(params: TextTranslateBatchRequest) {
    return this.#client.TextTranslateBatch(params);
  }
}
