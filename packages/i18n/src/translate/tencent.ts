import tencentcloud from "tencentcloud-sdk-nodejs-tmt";
import * as TencentCloudCommon from "tencentcloud-sdk-nodejs-common";
import {
  TextTranslateBatchRequest,
  TextTranslateRequest,
} from "tencentcloud-sdk-nodejs-tmt/tencentcloud/services/tmt/v20180321/tmt_models.js";
import { Client } from "tencentcloud-sdk-nodejs-tmt/tencentcloud/services/tmt/v20180321/tmt_client.js";

const TmtClient = tencentcloud.tmt.v20180321.Client;

const clientConfig = {
  credential: {
    secretId: "AKID1vcByhR0e5IGzVny72jFXaOxIOEpBIAn",
    secretKey: "QindEdpnX3LQGrENJ1VlnZ6PYT9a0FOV",
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "tmt.tencentcloudapi.com",
    },
  },
};

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
