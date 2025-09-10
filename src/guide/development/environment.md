---
title: 开发环境搭建
icon: laptop-code
order: 1
---

# 🛠️ 开发环境搭建

本指南将帮助你搭建飞鸟阅读的本地开发环境。

## 📋 环境准备

### 基础软件要求

- **PHP** >= 7.4 (推荐 8.0+)
- **MySQL** >= 5.7 (推荐 8.0+)
- **Node.js** >= 14.0 (用于前端资源构建)
- **Composer** (PHP 依赖管理)
- **Git** (版本控制)

### 开发工具推荐

- **IDE**: PhpStorm / VS Code
- **数据库工具**: Navicat / phpMyAdmin
- **API 测试**: Postman / Insomnia
- **Git 客户端**: SourceTree / Git Desktop

## 🚀 快速搭建

### 1. 克隆项目

```bash
git clone https://gitee.com/paheng/feiniao.git
cd feiniao
```

### 2. 安装依赖

```bash
# 安装 PHP 依赖
composer install

# 安装前端依赖（如果有）
npm install
```

### 3. 环境配置

复制并配置环境文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置数据库等信息：

```env
# 数据库配置
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=feiniao_dev
DB_USERNAME=root
DB_PASSWORD=

# 应用配置
APP_DEBUG=true
APP_URL=http://localhost:8000

# 缓存配置
CACHE_DRIVER=file
SESSION_DRIVER=file
```

### 4. 数据库初始化

```bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE feiniao_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 运行安装向导
# 访问 http://localhost:8000/install
```

## 🔧 开发配置

### 调试模式

在开发环境中启用调试模式：

```php
// config/app.php
'app_debug' => true,
'log_level' => 'debug',
```

### 错误显示

确保 PHP 显示错误信息：

```ini
; php.ini
display_errors = On
error_reporting = E_ALL
```

### 开发服务器

使用 PHP 内置服务器进行开发：

```bash
# 启动开发服务器
php think run -p 8000

# 或者使用特定主机和端口
php think run -H 0.0.0.0 -p 8000
```

## 📚 开发工作流

### 1. 代码规范

- 遵循 PSR-12 编码标准
- 使用有意义的变量和函数命名
- 添加必要的注释和文档

### 2. Git 工作流

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交代码
git add .
git commit -m "feat: add new feature"

# 推送分支
git push origin feature/new-feature
```

### 3. 测试流程

```bash
# 运行单元测试
php think test

# 运行代码质量检查
composer check-style
```

## 🔍 调试技巧

### 日志调试

```php
// 记录调试信息
Log::info('调试信息', ['data' => $data]);
Log::error('错误信息', ['error' => $exception]);
```

### 断点调试

配置 Xdebug 进行断点调试：

```ini
; php.ini
[XDebug]
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.client_host=127.0.0.1
xdebug.client_port=9003
```

### 数据库调试

```php
// 显示 SQL 查询
Db::listen(function ($sql, $time, $explain) {
    echo $sql . ' [' . $time . 's]' . PHP_EOL;
});
```

## 📦 常用命令

```bash
# 清除缓存
php think clear:cache

# 生成模型
php think make:model User

# 生成控制器
php think make:controller User

# 数据库迁移
php think migrate:run

# 查看路由列表
php think route:list
```

## 🚨 常见问题

### 权限问题

```bash
# 设置目录权限
chmod -R 777 runtime/
chmod -R 777 public/storage/
```

### 依赖冲突

```bash
# 清除 Composer 缓存
composer clear-cache

# 重新安装依赖
rm -rf vendor/
composer install
```

### 端口占用

```bash
# 查看端口占用
lsof -i :8000

# 杀死进程
kill -9 <PID>
```

## 🎯 下一步

环境搭建完成后，建议：

1. [📖 阅读编码规范](./coding-standards.md)
2. [🔌 了解插件开发](./plugin-development.md)
3. [🎨 学习主题定制](./theme-customization.md)

::: tip 💡 小贴士
开发环境配置完成后，建议创建一个快照或备份，以便快速恢复开发环境。
:::
