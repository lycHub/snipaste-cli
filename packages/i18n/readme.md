## 自动提取 i18n 文案并翻译

### usage

#### 安装

```text
npm add @snipaste-cli/i18n -D
```

#### 提取文案

```ssh
i18n extract -et "src/**/*.{ts,tsx}"
```

#### 将 resource.json 翻译成各语言文件

**项目根目录下新建 i18n.config.js**

```js
export default {
  extractTarget: "src/**/*.{ts,tsx}",
  extractDest: "i18n/resource.json",
  // langs: Langs,   默认：["zh", "en"]
  // mainLang: Langs[0],

  // resource.json路径，默认同extractDest "i18n/resource.json"
  resourcePath: "",
  // 翻译文件存放目录
  tranDest: "src/local",
  tencent: {
    config: {
      // 腾讯云api key: https://console.cloud.tencent.cn/cam/capi?from_column=20421&from=20421
      credential: {
        // 可用于测试
        secretId: "AKIDObcPxHOHySjmaAXs31lIbgXHqDMHzUlq",
        secretKey: "wfBTbVDhy2tWw89wVrzveATYP3TfdOxI",
      },
      region: "ap-shanghai",
      profile: {
        httpProfile: {
          endpoint: "tmt.tencentcloudapi.com",
        },
      },
    },
    translateParams: {
      ProjectId: 0,
    },
  },
};
```

```ssh
i18n gen
```
