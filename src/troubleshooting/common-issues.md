---
title: 常见问题排查
icon: wrench
order: 1
---

# 🔧 常见问题排查

本文档收集了飞鸟阅读使用过程中的常见问题及解决方案。

## 🚀 安装问题

### 问题1: 安装进度卡在99%

**症状**: 安装向导执行到99%后停止不动

**可能原因**:
- 数据库权限不足
- config目录无写入权限
- PHP执行时间限制

**解决方案**:

1. **检查数据库权限**
   ```sql
   -- 赋予用户完整权限
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
   FLUSH PRIVILEGES;
   
   -- 检查权限
   SHOW GRANTS FOR 'username'@'localhost';
   ```

2. **检查目录权限**
   ```bash
   # 设置config目录权限
   chmod -R 777 config/
   chown -R www-data:www-data config/
   
   # 检查权限
   ls -la config/
   ```

3. **调整PHP配置**
   ```ini
   ; php.ini
   max_execution_time = 300
   memory_limit = 256M
   ```

### 问题2: 提示函数被禁用

**症状**: 安装时提示 "putenv" 或 "proc_open" 函数被禁用

**解决方案**:
```ini
; 在 php.ini 中找到 disable_functions
; 修改前
disable_functions = exec,passthru,shell_exec,system,putenv,proc_open

; 修改后（移除 putenv 和 proc_open）
disable_functions = exec,passthru,shell_exec,system
```

重启Web服务器后重新安装。

### 问题3: 数据库连接失败

**症状**: 提示数据库连接错误

**解决方案**:

1. **检查数据库服务**
   ```bash
   # 检查MySQL状态
   systemctl status mysql
   
   # 启动MySQL
   systemctl start mysql
   ```

2. **验证连接参数**
   ```bash
   # 测试数据库连接
   mysql -h localhost -u username -p
   ```

3. **检查防火墙**
   ```bash
   # 开放MySQL端口
   ufw allow 3306
   ```

## 🌐 运行问题

### 问题1: 页面显示404错误

**症状**: 访问网站显示404页面

**可能原因**:
- 伪静态规则未配置
- Web服务器配置错误
- 文件权限问题

**解决方案**:

1. **Apache 伪静态配置**
   ```apache
   # .htaccess 文件
   <IfModule mod_rewrite.c>
   Options +FollowSymlinks -Multiviews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^(.*)$ index.php?/$1 [QSA,PT,L]
   </IfModule>
   ```

2. **Nginx 伪静态配置**
   ```nginx
   location / {
       if (!-e $request_filename){
           rewrite  ^(.*)$  /index.php?s=$1  last;
       }
   }
   ```

3. **宝塔面板设置**
   - 网站设置 → 伪静态 → 选择 "thinkphp"

### 问题2: 图形验证码不显示

**症状**: 验证码位置显示空白或错误

**解决方案**:

1. **检查GD扩展**
   ```bash
   # 检查是否安装GD扩展
   php -m | grep -i gd
   
   # Ubuntu/Debian安装
   apt-get install php-gd
   
   # CentOS安装
   yum install php-gd
   ```

2. **重启Web服务**
   ```bash
   systemctl restart apache2
   # 或
   systemctl restart nginx
   systemctl restart php-fpm
   ```

### 问题3: 文件上传失败

**症状**: 上传文件时提示失败

**解决方案**:

1. **检查PHP配置**
   ```ini
   ; php.ini
   file_uploads = On
   upload_max_filesize = 10M
   post_max_size = 10M
   max_execution_time = 300
   ```

2. **检查fileinfo扩展**
   ```bash
   php -m | grep -i fileinfo
   ```

3. **检查目录权限**
   ```bash
   chmod -R 777 public/storage/
   chown -R www-data:www-data public/storage/
   ```

## 📧 邮件问题

### 问题1: 邮件发送失败

**症状**: 系统邮件无法发送

**解决方案**:

1. **检查SMTP配置**
   - 确认SMTP服务器地址正确
   - 验证端口号（通常465或587）
   - 检查邮箱密码或授权码

2. **测试SMTP连接**
   ```php
   // 在后台系统设置中测试邮件发送
   // 或使用以下代码测试
   try {
       $mailer = new PHPMailer();
       $mailer->isSMTP();
       $mailer->Host = 'smtp.qq.com';
       $mailer->Port = 465;
       $mailer->SMTPAuth = true;
       $mailer->Username = 'your@email.com';
       $mailer->Password = 'your_password';
       $mailer->SMTPSecure = 'ssl';
       
       echo $mailer->smtpConnect() ? '连接成功' : '连接失败';
   } catch (Exception $e) {
       echo '错误：' . $e->getMessage();
   }
   ```

3. **常见邮箱配置**
   
   | 邮箱 | SMTP服务器 | 端口 | 加密 |
   |------|------------|------|------|
   | QQ邮箱 | smtp.qq.com | 465 | SSL |
   | 163邮箱 | smtp.163.com | 465 | SSL |
   | Gmail | smtp.gmail.com | 587 | TLS |

## 💳 支付问题

### 问题1: 支付宝支付失败

**症状**: 用户支付时跳转失败或提示错误

**解决方案**:

1. **检查配置信息**
   - 应用ID (APPID) 是否正确
   - 应用私钥格式是否正确
   - 支付宝公钥是否最新

2. **验证回调地址**
   - 确保回调地址可以外网访问
   - 检查HTTPS证书是否有效

3. **调试支付流程**
   ```php
   // 开启支付调试日志
   Log::info('支付请求参数', $params);
   Log::info('支付宝响应', $response);
   ```

### 问题2: 微信支付异常

**症状**: 微信支付无法正常使用

**解决方案**:

1. **检查商户配置**
   - 商户号 (MCH_ID) 是否正确
   - API密钥是否正确设置
   - 证书文件是否上传

2. **验证域名配置**
   - 在微信商户平台配置授权域名
   - 确保域名已备案

## 🎨 主题问题

### 问题1: 主题样式异常

**症状**: 页面样式显示错误或混乱

**解决方案**:

1. **清除缓存**
   ```bash
   # 清除系统缓存
   php think clear:cache
   
   # 清除浏览器缓存
   Ctrl + F5 (Windows)
   Cmd + Shift + R (Mac)
   ```

2. **检查静态资源**
   ```bash
   # 检查CSS/JS文件是否存在
   ls -la public/static/
   
   # 检查文件权限
   chmod -R 755 public/static/
   ```

3. **检查模板路径**
   - 确认模板文件在正确目录
   - 检查template目录权限

### 问题2: 移动端显示问题

**症状**: 手机访问页面显示异常

**解决方案**:

1. **检查响应式设计**
   - 确认模板包含viewport设置
   - 检查CSS媒体查询

2. **验证用户代理检测**
   ```php
   // 检查移动端检测逻辑
   if (isMobile()) {
       // 使用移动端模板
   }
   ```

## 🔍 性能问题

### 问题1: 页面加载缓慢

**症状**: 网站访问速度很慢

**解决方案**:

1. **开启缓存**
   ```php
   // config/cache.php
   'default' => 'redis',  // 或 'file'
   ```

2. **数据库优化**
   ```sql
   -- 添加必要索引
   ALTER TABLE fn_book ADD INDEX idx_category_status (category_id, status);
   
   -- 分析慢查询
   SHOW PROCESSLIST;
   ```

3. **静态资源优化**
   - 启用CDN加速
   - 压缩CSS/JS文件
   - 优化图片大小

### 问题2: 内存使用过高

**症状**: 服务器内存占用过高

**解决方案**:

1. **调整PHP配置**
   ```ini
   ; php.ini
   memory_limit = 256M
   max_execution_time = 30
   ```

2. **优化代码逻辑**
   - 避免一次性加载大量数据
   - 使用分页查询
   - 及时释放变量

3. **启用OPcache**
   ```ini
   ; php.ini
   opcache.enable=1
   opcache.memory_consumption=256
   ```

## 🔐 安全问题

### 问题1: 网站被攻击

**症状**: 网站出现异常内容或无法访问

**应急处理**:

1. **立即响应**
   ```bash
   # 暂时关闭网站
   # 在.htaccess中添加
   RewriteEngine On
   RewriteRule ^(.*)$ maintenance.html [R=503,L]
   ```

2. **检查和清理**
   ```bash
   # 检查可疑文件
   find . -name "*.php" -mtime -1
   
   # 检查文件权限
   find . -type f -perm 777
   
   # 查看访问日志
   tail -f /var/log/apache2/access.log
   ```

3. **安全加固**
   - 更改所有密码
   - 更新系统版本
   - 安装安全插件

## 🛠️ 调试工具

### 开启调试模式

```php
// config/app.php
'app_debug' => true,
'log_level' => 'debug',
```

### 查看日志文件

```bash
# 查看错误日志
tail -f runtime/log/error.log

# 查看访问日志
tail -f /var/log/nginx/access.log
```

### 数据库调试

```php
// 开启SQL日志
Db::listen(function ($sql, $time, $explain) {
    Log::info($sql . ' [' . $time . 's]');
});
```

## 📞 获取帮助

如果以上方案无法解决问题：

1. **查看详细日志**
   - 系统日志：`runtime/log/`
   - Web服务器日志：`/var/log/`

2. **收集问题信息**
   - 错误截图
   - 服务器环境
   - 复现步骤
   - 错误日志

3. **寻求帮助**
   - [官方论坛](https://www.paheng.com/forum-2-1.html)
   - QQ交流群：177260545
   - [Gitee Issues](https://gitee.com/paheng/feiniao/issues)

::: tip 💡 小贴士
遇到问题时，首先查看日志文件，大部分问题都能从日志中找到线索。
:::

::: warning ⚠️ 注意
在生产环境中修改配置前，请务必备份相关文件和数据库。
:::
