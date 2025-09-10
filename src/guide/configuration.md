---
title: 系统配置
icon: gear
order: 3
---

# ⚙️ 系统配置指南

本指南将帮助你了解飞鸟阅读的各项配置选项，让你的网站运行得更加稳定和高效。

## 🔧 基础配置

### 数据库配置

配置文件：`config/database.php`

```php
return [
    // 默认数据库连接
    'default' => 'mysql',
    
    'connections' => [
        'mysql' => [
            // 数据库类型
            'type' => 'mysql',
            // 服务器地址
            'hostname' => '127.0.0.1',
            // 数据库名
            'database' => 'feiniao',
            // 用户名
            'username' => 'root',
            // 密码
            'password' => '',
            // 端口
            'hostport' => '3306',
            // 数据库字符集
            'charset' => 'utf8mb4',
            // 数据库表前缀
            'prefix' => 'fn_',
        ],
    ],
];
```

### 应用配置

配置文件：`config/app.php`

```php
return [
    // 应用调试模式
    'app_debug' => false,
    
    // 应用默认时区
    'default_timezone' => 'Asia/Shanghai',
    
    // 默认应用
    'default_app' => 'home',
    
    // 域名绑定
    'domain_bind' => [
        'admin.yourdomain.com' => 'admin',
        'author.yourdomain.com' => 'author',
        'api.yourdomain.com' => 'api',
    ],
    
    // 分页配置
    'page_size' => 20,
];
```

## 🌐 多域名配置

飞鸟阅读支持多域名绑定，可以为不同模块分配独立域名。

### 配置方法

1. **修改应用配置**
   ```php
   // config/app.php
   'domain_bind' => [
       'www.yourdomain.com' => 'home',      // 前台
       'admin.yourdomain.com' => 'admin',    // 后台
       'author.yourdomain.com' => 'author',  // 作者中心
       'api.yourdomain.com' => 'api',        // API接口
   ],
   ```

2. **配置域名解析**
   在域名管理面板添加 A 记录或 CNAME 记录，将子域名指向服务器。

3. **Web服务器配置**
   
   **Nginx 示例：**
   ```nginx
   server {
       listen 80;
       server_name www.yourdomain.com admin.yourdomain.com author.yourdomain.com;
       root /var/www/feiniao/public;
       
       # 其他配置...
   }
   ```

## 📧 邮件配置

### SMTP 配置

在后台管理 → 系统设置 → 邮件配置中设置：

| 配置项 | 说明 | 示例 |
|--------|------|------|
| SMTP 服务器 | 邮件服务器地址 | smtp.qq.com |
| SMTP 端口 | 服务器端口 | 465 |
| 发送邮箱 | 发送方邮箱 | noreply@yourdomain.com |
| 邮箱密码 | 邮箱密码或授权码 | ******** |
| 加密方式 | 加密协议 | SSL |

### 常用邮箱配置

::: code-tabs

@tab QQ邮箱
```
SMTP服务器: smtp.qq.com
端口: 465 (SSL) 或 587 (TLS)
需要开启SMTP服务并获取授权码
```

@tab 163邮箱
```
SMTP服务器: smtp.163.com
端口: 465 (SSL) 或 994 (SSL)
需要开启SMTP服务
```

@tab Gmail
```
SMTP服务器: smtp.gmail.com
端口: 465 (SSL) 或 587 (TLS)
需要开启两步验证并使用应用专用密码
```

@tab 企业邮箱
```
SMTP服务器: 根据邮箱提供商而定
端口: 通常是 465 或 587
联系邮箱管理员获取配置信息
```

:::

## 💾 缓存配置

### Redis 缓存

配置文件：`config/cache.php`

```php
return [
    'default' => 'redis',
    
    'stores' => [
        'redis' => [
            'type' => 'redis',
            'host' => '127.0.0.1',
            'port' => 6379,
            'password' => '',
            'select' => 0,
            'timeout' => 0,
            'expire' => 0,
            'persistent' => false,
            'prefix' => 'feiniao:',
        ],
    ],
];
```

### 文件缓存

```php
return [
    'default' => 'file',
    
    'stores' => [
        'file' => [
            'type' => 'file',
            'path' => '../runtime/cache/',
            'prefix' => '',
            'expire' => 0,
        ],
    ],
];
```

## 🔐 安全配置

### 数据加密

配置文件：`config/app.php`

```php
return [
    // 应用密钥（用于数据加密）
    'app_key' => 'your-32-character-secret-key-here',
    
    // Cookie 加密
    'cookie' => [
        'secure' => true,    // HTTPS 下设为 true
        'httponly' => true,  // 防止 XSS
        'samesite' => 'Lax', // CSRF 防护
    ],
];
```

### Session 配置

配置文件：`config/session.php`

```php
return [
    'type' => 'redis',  // 或 'file'
    'auto_start' => true,
    'prefix' => 'feiniao',
    'expire' => 1440,   // 过期时间（分钟）
    'secure' => false,  // HTTPS 下设为 true
    'httponly' => true,
    'samesite' => 'Lax',
];
```

## 📁 文件存储配置

### 本地存储

配置文件：`config/filesystem.php`

```php
return [
    'default' => 'local',
    
    'disks' => [
        'local' => [
            'type' => 'local',
            'root' => '../public/storage',
        ],
    ],
];
```

### 云存储配置

::: code-tabs

@tab 阿里云 OSS
```php
'aliyun' => [
    'type' => 'aliyun',
    'accessId' => 'your-access-key-id',
    'accessSecret' => 'your-access-key-secret',
    'bucket' => 'your-bucket-name',
    'endpoint' => 'oss-cn-hangzhou.aliyuncs.com',
],
```

@tab 腾讯云 COS
```php
'qcloud' => [
    'type' => 'qcloud',
    'region' => 'ap-beijing',
    'credentials' => [
        'secretId' => 'your-secret-id',
        'secretKey' => 'your-secret-key',
    ],
    'bucket' => 'your-bucket-name',
],
```

@tab 七牛云
```php
'qiniu' => [
    'type' => 'qiniu',
    'accessKey' => 'your-access-key',
    'secretKey' => 'your-secret-key',
    'bucket' => 'your-bucket-name',
    'domain' => 'your-domain.com',
],
```

:::

## 🔍 搜索配置

### 全文搜索

飞鸟阅读支持 MySQL 全文索引搜索：

```sql
-- 为书籍表添加全文索引
ALTER TABLE fn_book ADD FULLTEXT(title, author, intro);

-- 为章节表添加全文索引  
ALTER TABLE fn_chapter ADD FULLTEXT(title, content);
```

### Elasticsearch 配置（可选）

如果需要更强大的搜索功能，可以集成 Elasticsearch：

```php
// config/search.php
return [
    'default' => 'elasticsearch',
    
    'engines' => [
        'elasticsearch' => [
            'hosts' => ['localhost:9200'],
            'index' => 'feiniao',
        ],
    ],
];
```

## 💳 支付配置

### 支付宝配置

在后台管理 → 系统设置 → 支付配置中设置：

```
应用ID (APPID): 你的支付宝应用ID
应用私钥: RSA2私钥
支付宝公钥: 支付宝提供的公钥
签名方式: RSA2
```

### 微信支付配置

```
商户号 (MCH_ID): 微信支付商户号
API密钥: 微信支付API密钥
应用ID (APPID): 微信公众号或小程序APPID
```

## 📊 日志配置

配置文件：`config/log.php`

```php
return [
    'default' => 'file',
    
    'channels' => [
        'file' => [
            'type' => 'file',
            'path' => '../runtime/log/',
            'level' => 'info',
            'file_size' => 2097152,  // 2MB
            'max_files' => 30,       // 保留30个文件
        ],
        
        'daily' => [
            'type' => 'daily',
            'path' => '../runtime/log/',
            'level' => 'info',
            'max_files' => 30,
        ],
    ],
];
```

## 🎨 主题配置

### 默认主题设置

在后台管理 → 系统设置 → 网站设置中：

- **PC端主题**: 选择电脑端主题模板
- **移动端主题**: 选择手机端主题模板
- **主题配置**: 设置主题颜色、Logo等

### 自定义主题

1. 在 `template` 目录下创建主题文件夹
2. 复制默认主题文件进行修改
3. 在后台选择新主题

## 🔧 性能优化配置

### OPcache 配置

```ini
; php.ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=20000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
```

### PHP-FPM 优化

```ini
; www.conf
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
```

## 📱 移动端配置

### 响应式设计

飞鸟阅读默认支持响应式设计，会根据设备自动调整布局。

### 移动端专用模板

可以为移动端设置专用模板：

1. 在 `template` 目录下创建 `mobile` 主题
2. 在后台设置中选择移动端主题
3. 系统会自动检测设备类型并使用相应模板

## 🌍 多语言配置

### 语言包配置

配置文件：`config/lang.php`

```php
return [
    'default_lang' => 'zh-cn',
    'allow_lang_list' => ['zh-cn', 'en-us'],
    'accept_language' => true,
    'fallback_lang' => 'zh-cn',
];
```

### 添加新语言

1. 在 `app/lang` 目录下创建语言文件
2. 翻译所有文本内容
3. 在配置中启用新语言

## 🔄 定时任务配置

### 系统定时任务

飞鸟阅读需要配置一些定时任务来维护系统：

```bash
# 添加到 crontab
# 每分钟执行一次定时任务
* * * * * cd /path/to/feiniao && php think crontab

# 每日清理日志
0 2 * * * cd /path/to/feiniao && php think clear:log

# 每周数据备份
0 3 * * 0 cd /path/to/feiniao && php think backup:database
```

## 🛡️ 安全加固

### 隐藏敏感信息

1. **隐藏 PHP 版本信息**
   ```ini
   ; php.ini
   expose_php = Off
   ```

2. **禁用危险函数**
   ```ini
   ; php.ini
   disable_functions = exec,passthru,shell_exec,system
   ```

3. **设置安全头部**
   ```nginx
   # Nginx 配置
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-Content-Type-Options "nosniff";
   add_header X-XSS-Protection "1; mode=block";
   ```

### 文件权限设置

```bash
# 设置安全的文件权限
find /path/to/feiniao -type d -exec chmod 755 {} \;
find /path/to/feiniao -type f -exec chmod 644 {} \;

# 特殊目录权限
chmod -R 777 runtime/
chmod -R 777 public/storage/
```

## ✅ 配置检查清单

安装完成后，请检查以下配置：

- [ ] 数据库连接正常
- [ ] 邮件发送功能正常
- [ ] 缓存系统工作正常
- [ ] 文件上传功能正常
- [ ] 支付功能配置正确
- [ ] 定时任务设置完成
- [ ] 安全配置已加固
- [ ] 性能优化已启用
- [ ] 备份策略已制定

## 🆘 配置问题排查

如果配置后出现问题，可以：

1. **检查日志文件**
   ```bash
   tail -f runtime/log/error.log
   ```

2. **开启调试模式**
   ```php
   // config/app.php
   'app_debug' => true,
   ```

3. **清除缓存**
   ```bash
   php think clear:cache
   ```

4. **重启服务**
   ```bash
   sudo systemctl restart nginx
   sudo systemctl restart php-fpm
   ```

---

::: tip 💡 小贴士
配置完成后建议重启 Web 服务器使配置生效，并进行全面的功能测试。
:::

::: info 📚 相关文档
- [安装指南](./installation.md) - 详细安装步骤
- [故障排除](../troubleshooting/common-issues.md) - 常见问题解决
- [性能优化](../troubleshooting/performance.md) - 性能调优指南
:::
