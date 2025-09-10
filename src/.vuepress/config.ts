import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/feiniao-docs/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "飞鸟阅读",
      description: "专业的小说内容管理系统开发者文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
