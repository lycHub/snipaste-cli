export default {
  extractTarget: "src/**/*.{ts,tsx}",
  extractDest: "i18n/resource.json",
  // langs: Langs,
  // mainLang: Langs[0],
  resourcePath: "",
  tranDest: "i18n",

  tencent: {
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
    projectId: 0,
  },
};
