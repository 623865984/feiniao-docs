import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",

  {
    text: "开发指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "基础指南",
        icon: "book",
        children: [
          "getting-started",
          "installation",
          "configuration",
          "deployment"
        ],
      },
      {
        text: "开发文档",
        icon: "code",
        children: [
          "development/environment",
          "development/coding-standards",
          "development/plugin-development",
          "development/theme-customization"
        ],
      },
    ],
  },
  {
    text: "API文档",
    icon: "gear",
    link: "/api/",
  },
  {
    text: "架构设计",
    icon: "sitemap",
    prefix: "/architecture/",
    children: [
      "overview",
      "database",
      "module-structure",
      "security"
    ],
  },
  {
    text: "示例教程",
    icon: "laptop-code",
    link: "/examples/",
  },
  {
    text: "官方网站",
    icon: "house",
    link: "https://feiniao.paheng.net",
  },
]);
