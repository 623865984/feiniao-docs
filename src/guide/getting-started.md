---
title: 快速开始
icon: rocket
order: 1
---

# 🚀 15分钟快速开始

欢迎使用飞鸟阅读！本指南将帮助你在15分钟内搭建一个完整的小说阅读网站。

## 📋 环境要求

在开始之前，请确保你的服务器满足以下要求：

### 基础环境
- **PHP** >= 7.4 (推荐 8.0+)
- **MySQL** >= 5.5.0 (需支持 innodb 引擎)
- **Web服务器**: Apache 或 Nginx
- **Composer**: 用于管理 PHP 依赖

### PHP 扩展要求
- PDO PHP Extension
- MBstring PHP Extension  
- CURL PHP Extension
- GD PHP Extension (用于验证码)
- Fileinfo PHP Extension (用于文件上传)

::: tip 💡 环境检测
安装过程中系统会自动检测环境是否满足要求，如有问题会给出具体提示。
:::

## ⚡ 第一步：获取源码 (2分钟)

### 方法一：Git 克隆 (推荐)
```bash
git clone https://gitee.com/paheng/feiniao.git
cd feiniao
```

### 方法二：直接下载
1. 访问 [Gitee 发布页面](https://gitee.com/paheng/feiniao/releases)
2. 下载最新版本的源码包
3. 解压到你的网站目录

## 🔧 第二步：安装依赖 (3分钟)

进入项目目录，安装 PHP 依赖：

```bash
composer install
```

::: warning ⚠️ 注意
如果你的服务器无法访问外网，可以跳过这一步，源码包中已经包含了必要的依赖文件。
:::

## 🌐 第三步：配置 Web 服务器 (5分钟)

### Apache 配置

1. **虚拟主机配置**
   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       DocumentRoot /path/to/feiniao/public
       <Directory "/path/to/feiniao/public">
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

2. **伪静态规则**
   在 `public` 目录下创建 `.htaccess` 文件：
   ```apache
   <IfModule mod_rewrite.c>
   Options +FollowSymlinks -Multiviews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^(.*)$ index.php?/$1 [QSA,PT,L]
   </IfModule>
   ```

### Nginx 配置

1. **虚拟主机配置**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /path/to/feiniao/public;
       index index.php;

       location / {
           if (!-e $request_filename){
               rewrite  ^(.*)$  /index.php?s=$1  last;
           }
       }

       location ~ \.php$ {
           fastcgi_pass 127.0.0.1:9000;
           fastcgi_index index.php;
           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           include fastcgi_params;
       }
   }
   ```

::: danger 🚨 重要提醒
- 确保将域名绑定到 `public` 目录，而不是项目根目录
- 确保 Web 服务器对项目目录有读写权限
:::

## 🎯 第四步：运行安装向导 (5分钟)

1. **访问安装页面**
   ```
   http://yourdomain.com/install/index
   ```

2. **环境检测**
   系统会自动检测服务器环境，确保所有项目都显示 ✅

3. **数据库配置**
   填写数据库连接信息：
   - 数据库主机：通常是 `localhost`
   - 数据库端口：通常是 `3306`
   - 数据库名称：建议新建空数据库
   - 数据库用户名和密码

4. **管理员账号**
   设置后台管理员账号：
   - 管理员用户名
   - 管理员密码
   - 管理员邮箱

5. **完成安装**
   点击"开始安装"，等待安装完成

::: tip 💡 安装提示
- 安装过程中如果进度条卡住，通常是数据库权限问题，请检查数据库用户权限
- 如需重新安装，删除 `config/install.lock` 文件即可
:::

## 🎉 第五步：体验功能

安装完成后，你可以：

### 访问前台
```
http://yourdomain.com
```
体验读者功能：浏览小说、注册账号、收藏图书等

### 访问后台
```
http://yourdomain.com/admin
```
使用安装时设置的管理员账号登录，管理网站内容

### 访问作者中心
```
http://yourdomain.com/author
```
注册作者账号，开始创作小说

## 🔧 常见问题

### Q: 安装后页面显示 404
**A:** 检查伪静态规则是否配置正确，确保使用 ThinkPHP 的伪静态规则。

### Q: 无法显示验证码
**A:** 确认 PHP GD 扩展已安装并启用。

### Q: 文件上传失败  
**A:** 检查 PHP fileinfo 扩展是否开启，以及目录权限是否正确。

### Q: 安装进度卡在 99%
**A:** 通常是数据库权限或 config 目录写入权限问题，检查相关权限设置。

## 🎯 下一步

恭喜！你已经成功搭建了飞鸟阅读系统。接下来你可以：

- [📖 阅读配置指南](./configuration.md) - 了解系统配置选项
- [🏗️ 查看系统架构](../architecture/overview.md) - 深入了解系统设计
- [🛠️ 搭建开发环境](./development/environment.md) - 开始二次开发
- [🔌 开发插件](./development/plugin-development.md) - 扩展系统功能

::: info 📞 需要帮助？
如果在安装过程中遇到问题，可以：
- 查看 [故障排除指南](../troubleshooting/common-issues.md)
- 访问 [官方论坛](https://www.paheng.com/forum-2-1.html)
- 加入 QQ 交流群：177260545
:::
