import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "🚀 快速开始",
      icon: "rocket",
      prefix: "guide/",
      collapsible: true,
      collapsed: true,
      children: [
        "getting-started",
        "installation", 
        "configuration",
        "deployment"
      ],
    },
    {
      text: "🏗️ 系统架构",
      icon: "sitemap",
      prefix: "architecture/",
      collapsible: true,
      collapsed: true,
      children: [
        "overview",
        "database",
        "module-structure", 
        "security"
      ],
    },
    {
      text: "🛠️ 开发指南",
      icon: "code",
      prefix: "guide/development/",
      collapsible: true,
      collapsed: true,
      children: [
        "environment",
        "coding-standards",
        "plugin-development",
        "theme-customization"
      ],
    },
    {
      text: "⚙️ API 文档",
      icon: "gear",
      link: "api/",
    },
    {
      text: "✨ 功能特性",
      icon: "star",
      link: "features/",
    },
    {
      text: "💡 示例教程",
      icon: "laptop-code",
      link: "examples/",
    },
    {
      text: "🔧 故障排除",
      icon: "wrench",
      prefix: "troubleshooting/",
      collapsible: true,
      collapsed: true,
      children: [
        "common-issues",
        "performance",
        "debugging"
      ],
    },
    {
      text: "❓ 常见问题",
      icon: "question",
      link: "faq.md",
    },
  ],
});
