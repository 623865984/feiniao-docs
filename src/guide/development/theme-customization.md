---
title: 主题定制指南
icon: palette
order: 4
---

# 🎨 主题定制指南

飞鸟阅读支持灵活的主题定制功能，让你可以打造独特的网站风格。

## 📁 主题结构

```
template/
├── default_pc/          # PC端默认主题
│   ├── common/         # 公共模板
│   ├── index/          # 首页模板
│   ├── book/           # 图书模板
│   ├── chapter/        # 章节模板
│   └── user/           # 用户模板
└── default_mobile/     # 移动端默认主题
    ├── common/         # 公共模板
    ├── index/          # 首页模板
    └── ...
```

## 🛠️ 创建自定义主题

### 1. 复制默认主题
```bash
cp -r template/default_pc template/my_theme
```

### 2. 修改主题信息
编辑 `copyright.xml` 文件：
```xml
<?xml version="1.0" encoding="utf-8"?>
<theme>
    <name>我的主题</name>
    <author>开发者</author>
    <version>1.0.0</version>
    <description>自定义主题描述</description>
</theme>
```

### 3. 自定义样式
在主题目录下创建 `static/css/custom.css`：
```css
/* 自定义样式 */
.header {
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

.book-card {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

## 🎯 主题开发技巧

### 模板语法
```html
<!-- 条件判断 -->
{if $user}
    欢迎，{$user.nickname}
{else/}
    请登录
{/if}

<!-- 循环遍历 -->
{volist name="books" id="book"}
    <div class="book-item">
        <h3>{$book.title}</h3>
        <p>{$book.author_name}</p>
    </div>
{/volist}
```

### 响应式设计
```css
/* 移动端适配 */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
    
    .book-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

## 📋 主题配置

在后台 → 系统设置 → 网站设置中：
1. 选择PC端主题
2. 选择移动端主题
3. 配置主题参数

## 📚 更多资源

主题开发详细教程正在编写中...

## 💡 设计建议

- 保持简洁美观的设计
- 注重用户体验
- 确保移动端兼容性
- 优化加载性能
