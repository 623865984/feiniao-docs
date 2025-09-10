# 飞鸟阅读开发者文档

基于 VuePress Theme Hope 构建的飞鸟阅读专业开发者文档网站（纯中文版）。

## 📖 在线文档

访问地址：https://623865984.github.io/feiniao-docs/

## 🔄 自动部署

推送到 main 分支时会自动触发 GitHub Actions 构建和部署到 GitHub Pages。

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

启动后访问 http://localhost:8080 查看文档网站。

### 构建生产版本

```bash
npm run docs:build
```

构建完成后，静态文件将生成在 `src/.vuepress/dist` 目录中。

## 📁 文档结构

```
src/
├── .vuepress/           # VuePress 配置
│   ├── config.ts       # 主配置文件
│   ├── theme.ts        # 主题配置
│   ├── navbar/         # 导航栏配置
│   ├── sidebar/        # 侧边栏配置
│   ├── public/         # 静态资源
│   └── styles/         # 自定义样式
├── README.md           # 首页
├── guide/              # 使用指南
├── architecture/       # 系统架构
├── api/                # API文档（预留）
├── features/           # 功能特性（预留）
├── examples/           # 示例教程（预留）
├── troubleshooting/    # 故障排除
└── faq.md              # 常见问题
```

## 📝 文档编写

### 添加新页面

1. 在相应目录下创建 `.md` 文件
2. 添加 Front Matter 配置
3. 更新导航栏和侧边栏配置

### Front Matter 示例

```yaml
---
title: 页面标题
icon: 图标名称
order: 排序号
---
```

### 支持的功能

- ✅ Markdown 增强语法
- ✅ 代码高亮和代码组
- ✅ 自定义容器（提示、警告、危险等）
- ✅ 图表支持（Mermaid、Chart.js）
- ✅ 数学公式（KaTeX）
- ✅ 组件支持
- ✅ 深色模式
- ✅ 全文搜索

## 🎨 自定义配置

### 修改主题配置

编辑 `src/.vuepress/theme.ts` 文件：

```typescript
export default hopeTheme({
  hostname: "https://feiniao.paheng.net",
  author: {
    name: "FeiNiao Team",
    url: "https://feiniao.paheng.net",
  },
  logo: "/logo.svg",
  repo: "uudzs/feiniao",
  // 其他配置...
});
```

### 修改导航栏

编辑 `src/.vuepress/navbar/zh.ts` 文件添加或修改导航项。

### 修改侧边栏

编辑 `src/.vuepress/sidebar/zh.ts` 文件调整侧边栏结构。

## 🚀 部署

### GitHub Pages

1. 在 GitHub 创建仓库
2. 推送代码到仓库
3. 在仓库设置中启用 GitHub Pages
4. 选择 `gh-pages` 分支作为源

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令：`npm run docs:build`
3. 设置发布目录：`src/.vuepress/dist`

### 自定义服务器

```bash
# 构建文档
npm run docs:build

# 将 src/.vuepress/dist 目录内容部署到 Web 服务器
rsync -avz src/.vuepress/dist/ user@server:/var/www/docs/
```

## 🤝 贡献指南

### 贡献文档

1. Fork 这个仓库
2. 创建特性分支：`git checkout -b feature/new-doc`
3. 提交更改：`git commit -am 'Add new documentation'`
4. 推送分支：`git push origin feature/new-doc`
5. 提交 Pull Request

### 文档规范

- 使用清晰的标题层次结构
- 添加适当的代码示例
- 包含必要的截图或图表
- 保持语言简洁明了
- 及时更新过时内容

## 📞 获取帮助

- **官方网站**: https://feiniao.paheng.net
- **GitHub Issues**: https://github.com/623865984/feiniao-docs/issues
- **Gitee Issues**: https://gitee.com/paheng/feiniao/issues
- **QQ交流群**: 177260545

## 📄 许可证

本文档采用 MIT 许可证。详见 [LICENSE](../LICENSE) 文件。

---

**飞鸟阅读团队**  
专业的小说内容管理系统
