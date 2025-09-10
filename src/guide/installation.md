---
title: 详细安装指南
icon: download
order: 2
---

# 📥 详细安装指南

本指南提供飞鸟阅读的详细安装步骤，包括不同环境下的配置方法和常见问题解决方案。

## 🎯 安装概述

飞鸟阅读支持多种安装方式：
- **标准安装**：适合大多数用户的常规安装方式
- **Docker 安装**：容器化部署，环境隔离
- **宝塔面板安装**：适合使用宝塔面板的用户

## 📋 系统要求

### 服务器配置推荐

| 配置项 | 最低要求 | 推荐配置 |
|--------|----------|----------|
| CPU | 1核 | 2核+ |
| 内存 | 1GB | 4GB+ |
| 硬盘 | 10GB | 50GB+ |
| 带宽 | 1M | 3M+ |

### 软件环境要求

| 软件 | 版本要求 | 说明 |
|------|----------|------|
| PHP | >= 7.4 | 推荐 8.0+ |
| MySQL | >= 5.5.0 | 需支持 InnoDB 引擎 |
| Web服务器 | Apache 2.4+ / Nginx 1.10+ | - |
| Composer | 最新版本 | PHP 依赖管理工具 |

### PHP 扩展要求

必需扩展：
- `pdo` - 数据库连接
- `pdo_mysql` - MySQL 支持
- `mbstring` - 多字节字符串处理
- `curl` - HTTP 请求支持
- `json` - JSON 数据处理
- `openssl` - 加密支持

推荐扩展：
- `gd` - 图像处理（验证码、缩略图）
- `fileinfo` - 文件信息检测（文件上传）
- `zip` - 压缩文件支持
- `redis` - 缓存支持
- `opcache` - 性能优化

## 🚀 标准安装

### 步骤 1：下载源码

#### 方法一：Git 克隆（推荐）
```bash
# 克隆最新版本
git clone https://gitee.com/paheng/feiniao.git

# 或者克隆 Gitee 镜像（国内用户推荐）
git clone https://gitee.com/paheng/feiniao.git

# 进入项目目录
cd feiniao
```

#### 方法二：下载压缩包
1. 访问 [Gitee Releases](https://gitee.com/paheng/feiniao/releases)
2. 下载最新版本的 Source code (zip)
3. 解压到网站根目录

### 步骤 2：安装依赖

```bash
# 使用 Composer 安装 PHP 依赖
composer install --no-dev --optimize-autoloader

# 如果 Composer 速度慢，可以使用国内镜像
composer config repo.packagist composer https://mirrors.aliyun.com/composer/
composer install --no-dev --optimize-autoloader
```

::: tip 💡 提示
如果服务器无法运行 Composer，可以在本地安装后上传 `vendor` 目录。
:::

### 步骤 3：设置目录权限

```bash
# 设置必要的目录权限
chmod -R 755 public/
chmod -R 777 runtime/
chmod -R 777 config/
chmod -R 777 public/storage/

# 如果使用 Linux，建议设置正确的用户组
chown -R www-data:www-data /path/to/feiniao
```

### 步骤 4：配置 Web 服务器

#### Apache 配置

1. **创建虚拟主机**
   
   编辑 Apache 配置文件（通常是 `/etc/apache2/sites-available/feiniao.conf`）：
   
   ```apache
   <VirtualHost *:80>
       ServerName feiniao.example.com
       ServerAlias www.feiniao.example.com
       DocumentRoot /var/www/feiniao/public
       
       <Directory "/var/www/feiniao/public">
           AllowOverride All
           Options Indexes FollowSymLinks
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/feiniao_error.log
       CustomLog ${APACHE_LOG_DIR}/feiniao_access.log combined
   </VirtualHost>
   ```

2. **启用站点和必要模块**
   ```bash
   a2enmod rewrite
   a2ensite feiniao.conf
   systemctl reload apache2
   ```

3. **配置 .htaccess**
   
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

#### Nginx 配置

1. **创建站点配置**
   
   创建 `/etc/nginx/sites-available/feiniao` 文件：
   ```nginx
   server {
       listen 80;
       server_name feiniao.example.com www.feiniao.example.com;
       root /var/www/feiniao/public;
       index index.php index.html;
       
       # 访问日志
       access_log /var/log/nginx/feiniao_access.log;
       error_log /var/log/nginx/feiniao_error.log;
       
       # 伪静态规则
       location / {
           try_files $uri $uri/ /index.php?$query_string;
           if (!-e $request_filename) {
               rewrite ^(.*)$ /index.php?s=$1 last;
           }
       }
       
       # PHP 处理
       location ~ \.php$ {
           fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
           fastcgi_index index.php;
           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           include fastcgi_params;
           
           # 增加超时时间
           fastcgi_read_timeout 300;
           fastcgi_connect_timeout 300;
       }
       
       # 静态文件处理
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # 安全设置
       location ~ /\. {
           deny all;
       }
       
       location ~ ^/(config|runtime|vendor)/ {
           deny all;
       }
   }
   ```

2. **启用站点**
   ```bash
   ln -s /etc/nginx/sites-available/feiniao /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

### 步骤 5：数据库准备

1. **创建数据库**
   ```sql
   CREATE DATABASE feiniao CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **创建数据库用户**
   ```sql
   CREATE USER 'feiniao'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON feiniao.* TO 'feiniao'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 步骤 6：运行安装向导

1. **访问安装页面**
   ```
   http://feiniao.example.com/install/index
   ```

2. **按照向导完成安装**
   - 环境检测
   - 数据库配置
   - 管理员设置
   - 完成安装

## 🐳 Docker 安装

### 使用 Docker Compose（推荐）

1. **创建 docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     feiniao:
       image: php:8.0-apache
       ports:
         - "80:80"
       volumes:
         - ./:/var/www/html
         - ./docker/apache.conf:/etc/apache2/sites-available/000-default.conf
       depends_on:
         - mysql
         - redis
       environment:
         - DB_HOST=mysql
         - DB_DATABASE=feiniao
         - DB_USERNAME=feiniao
         - DB_PASSWORD=password
         - REDIS_HOST=redis
   
     mysql:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: rootpassword
         MYSQL_DATABASE: feiniao
         MYSQL_USER: feiniao
         MYSQL_PASSWORD: password
       volumes:
         - mysql_data:/var/lib/mysql
       ports:
         - "3306:3306"
   
     redis:
       image: redis:6-alpine
       ports:
         - "6379:6379"
   
   volumes:
     mysql_data:
   ```

2. **启动服务**
   ```bash
   docker-compose up -d
   ```

## 🔧 宝塔面板安装

### 环境准备

1. **安装宝塔面板**
   ```bash
   wget -O install.sh http://download.bt.cn/install/install_6.0.sh
   bash install.sh
   ```

2. **安装 LNMP 环境**
   - Nginx 1.20+
   - MySQL 8.0
   - PHP 8.0
   - phpMyAdmin

3. **安装必要的 PHP 扩展**
   在宝塔面板 → 软件商店 → PHP 8.0 → 设置 → 安装扩展：
   - fileinfo
   - redis
   - opcache

### 站点创建

1. **添加站点**
   - 域名：你的域名
   - 根目录：选择合适的目录
   - PHP 版本：8.0
   - 数据库：创建同名数据库

2. **上传源码**
   - 将飞鸟阅读源码上传到站点根目录
   - 解压并设置权限

3. **设置伪静态**
   在站点设置 → 伪静态中选择 "thinkphp" 规则

4. **配置 SSL（可选）**
   - 申请 Let's Encrypt 证书
   - 开启强制 HTTPS

## 🔍 安装后检查

### 功能测试

1. **前台功能**
   - [ ] 首页正常显示
   - [ ] 用户注册登录
   - [ ] 小说浏览和搜索
   - [ ] 阅读功能正常

2. **后台功能**
   - [ ] 管理员登录
   - [ ] 系统设置
   - [ ] 内容管理
   - [ ] 用户管理

3. **作者功能**
   - [ ] 作者注册登录
   - [ ] 作品创建
   - [ ] 章节发布
   - [ ] 数据统计

### 性能优化

1. **开启 OPcache**
   ```ini
   ; php.ini
   opcache.enable=1
   opcache.memory_consumption=256
   opcache.max_accelerated_files=20000
   ```

2. **配置 Redis 缓存**
   ```php
   // config/cache.php
   'default' => 'redis',
   'stores' => [
       'redis' => [
           'type' => 'redis',
           'host' => '127.0.0.1',
           'port' => 6379,
       ],
   ],
   ```

## 🚨 常见问题

### 安装问题

**Q: 提示 "putenv" 或 "proc_open" 函数被禁用**
```ini
; 在 php.ini 中找到 disable_functions，移除这两个函数
disable_functions = exec,passthru,shell_exec,system
```

**Q: 数据库连接失败**
- 检查数据库服务是否启动
- 确认数据库用户权限
- 验证连接参数是否正确

**Q: 目录权限问题**
```bash
# 设置正确的目录权限
chmod -R 755 public/
chmod -R 777 runtime/
chmod -R 777 config/
```

### 运行问题

**Q: 页面显示空白**
- 检查 PHP 错误日志
- 确认 PHP 扩展是否完整
- 验证文件权限设置

**Q: 静态资源加载失败**
- 检查伪静态规则
- 确认 Web 服务器配置
- 验证文件路径是否正确

## 🎯 下一步

安装完成后，建议：

1. [📖 阅读配置指南](./configuration.md)
2. [🔒 配置安全设置](../architecture/security.md)
3. [⚡ 性能优化](../troubleshooting/performance.md)
4. [🎨 主题定制](./development/theme-customization.md)

::: info 📞 需要帮助？
- [官方文档](https://feiniao.paheng.net/frontend/list)
- [社区论坛](https://www.paheng.com/forum-2-1.html)
- QQ 交流群：177260545
:::
