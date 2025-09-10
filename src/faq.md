---
title: 常见问题
icon: question
order: 10
---

# ❓ 常见问题

这里收集了用户在使用飞鸟阅读过程中经常遇到的问题和解决方案。

## 🚀 安装相关

### Q: 安装时提示 "putenv" 或 "proc_open" 函数被禁用

**A:** 这通常是服务器安全设置导致的，需要在 PHP 配置中启用这些函数。

**解决方案：**
1. 找到 `php.ini` 文件位置
2. 搜索 `disable_functions` 配置项
3. 从禁用列表中移除 `putenv` 和 `proc_open`
4. 重启 Web 服务器

```ini
; 修改前
disable_functions = exec,passthru,shell_exec,system,putenv,proc_open

; 修改后  
disable_functions = exec,passthru,shell_exec,system
```

### Q: 安装进度卡在 99% 不动

**A:** 这通常是数据库权限或目录写入权限问题。

**解决方案：**
1. **检查数据库权限**
   ```sql
   -- 确保数据库用户有足够权限
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **检查目录权限**
   ```bash
   chmod -R 777 config/
   chmod -R 777 runtime/
   chown -R www-data:www-data /path/to/feiniao
   ```

### Q: 安装后页面显示 404 错误

**A:** 这通常是伪静态规则配置问题。

**解决方案：**

**Apache 用户：**
确保在 `public` 目录下有 `.htaccess` 文件：
```apache
<IfModule mod_rewrite.c>
Options +FollowSymlinks -Multiviews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php?/$1 [QSA,PT,L]
</IfModule>
```

**Nginx 用户：**
在站点配置中添加：
```nginx
location / {
    if (!-e $request_filename){
        rewrite  ^(.*)$  /index.php?s=$1  last;
    }
}
```

**宝塔面板用户：**
在站点设置 → 伪静态中选择 "thinkphp" 规则。

## 🔧 功能相关

### Q: 无法显示图形验证码

**A:** 这是因为缺少 PHP GD 扩展。

**解决方案：**
1. **检查 GD 扩展**
   ```php
   <?php phpinfo(); ?>
   // 查看是否有 GD 扩展信息
   ```

2. **安装 GD 扩展**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install php-gd
   
   # CentOS/RHEL
   sudo yum install php-gd
   
   # 重启 Web 服务器
   sudo systemctl restart apache2
   # 或
   sudo systemctl restart nginx
   ```

### Q: 文件上传失败

**A:** 可能是 fileinfo 扩展未安装或文件大小限制问题。

**解决方案：**
1. **安装 fileinfo 扩展**
   ```bash
   # 大多数 PHP 版本默认包含，如果没有：
   sudo apt-get install php-fileinfo
   ```

2. **调整文件上传限制**
   ```ini
   ; php.ini
   upload_max_filesize = 10M
   post_max_size = 10M
   max_execution_time = 300
   ```

3. **检查目录权限**
   ```bash
   chmod -R 777 public/storage/
   ```

### Q: 邮件发送失败

**A:** 需要配置正确的邮件服务器信息。

**解决方案：**
1. 在后台 → 系统设置 → 邮件配置中设置：
   - SMTP 服务器地址
   - SMTP 端口（通常 465 或 587）
   - 邮箱账号和密码
   - 加密方式（SSL/TLS）

2. 常用邮箱配置示例：
   ```
   QQ邮箱：
   SMTP: smtp.qq.com
   端口: 465 (SSL)
   
   163邮箱：
   SMTP: smtp.163.com  
   端口: 465 (SSL)
   
   Gmail：
   SMTP: smtp.gmail.com
   端口: 587 (TLS)
   ```

## 💰 支付相关

### Q: 支付宝支付配置失败

**A:** 需要正确配置支付宝商户信息。

**解决方案：**
1. 在支付宝开放平台创建应用
2. 获取以下信息：
   - 应用 ID (APPID)
   - 应用私钥
   - 支付宝公钥
   - 签名方式（RSA2）
3. 在后台配置这些信息
4. 设置正确的回调地址

### Q: 微信支付接入问题

**A:** 确保微信商户号配置正确。

**解决方案：**
1. 在微信商户平台获取：
   - 商户号 (MCH_ID)
   - API 密钥
   - 证书文件
2. 配置支付回调地址
3. 确保服务器支持 HTTPS

## 🎨 主题相关

### Q: 如何更换网站主题

**A:** 飞鸟阅读支持主题切换功能。

**解决方案：**
1. 将主题文件放到 `template` 目录
2. 在后台 → 系统设置 → 网站设置中选择主题
3. 清除缓存使主题生效

### Q: 自定义主题样式不生效

**A:** 可能是缓存或路径问题。

**解决方案：**
1. 清除系统缓存
2. 检查 CSS/JS 文件路径是否正确
3. 确保静态资源文件有读取权限
4. 检查浏览器缓存

## 📱 移动端相关

### Q: 移动端页面显示异常

**A:** 检查移动端模板配置。

**解决方案：**
1. 确保移动端模板文件完整
2. 检查响应式 CSS 是否正确
3. 测试不同设备的兼容性
4. 优化图片和资源加载

## 🔐 安全相关

### Q: 如何加强网站安全

**A:** 建议采取以下安全措施：

**解决方案：**
1. **定期更新系统**
   - 及时更新飞鸟阅读版本
   - 更新 PHP 和数据库版本
   - 安装安全补丁

2. **强化密码策略**
   - 使用复杂密码
   - 定期更换密码
   - 启用双因素认证

3. **服务器安全配置**
   - 配置防火墙
   - 禁用不必要的服务
   - 定期备份数据

4. **应用层安全**
   - 开启 HTTPS
   - 配置安全头部
   - 限制文件上传类型

### Q: 网站被攻击怎么办

**A:** 立即采取应急措施。

**解决方案：**
1. **立即响应**
   - 暂时关闭网站
   - 检查服务器日志
   - 分析攻击类型

2. **清理和修复**
   - 删除恶意文件
   - 修复安全漏洞
   - 更新所有密码

3. **预防措施**
   - 安装安全插件
   - 配置 WAF 防护
   - 增强监控告警

## 📊 性能相关

### Q: 网站访问速度慢

**A:** 需要进行性能优化。

**解决方案：**
1. **开启缓存**
   ```php
   // 在配置文件中启用 Redis 缓存
   'default' => 'redis',
   ```

2. **数据库优化**
   - 添加必要的索引
   - 优化慢查询
   - 考虑读写分离

3. **静态资源优化**
   - 启用 CDN 加速
   - 压缩 CSS/JS 文件
   - 优化图片大小

4. **服务器优化**
   - 启用 OPcache
   - 调整 PHP-FPM 配置
   - 增加服务器资源

### Q: 数据库连接数过多

**A:** 优化数据库连接配置。

**解决方案：**
1. **调整连接池配置**
   ```php
   // database.php
   'connections' => 20,  // 最大连接数
   'break_reconnect' => true,
   ```

2. **优化查询语句**
   - 避免 N+1 查询问题
   - 使用合适的索引
   - 减少不必要的查询

3. **使用连接池**
   - 配置数据库连接池
   - 复用数据库连接

## 🔄 升级相关

### Q: 如何升级飞鸟阅读版本

**A:** 按照以下步骤安全升级。

**解决方案：**
1. **备份数据**
   ```bash
   # 备份数据库
   mysqldump -u username -p database_name > backup.sql
   
   # 备份文件
   tar -czf feiniao_backup.tar.gz /path/to/feiniao
   ```

2. **下载新版本**
   - 从官方渠道下载最新版本
   - 检查版本兼容性说明

3. **执行升级**
   - 替换程序文件（保留配置文件）
   - 运行数据库升级脚本
   - 清除缓存

4. **验证升级**
   - 测试主要功能
   - 检查数据完整性
   - 监控系统运行状态

## 📞 获取帮助

如果以上解决方案无法解决你的问题，可以通过以下方式获取帮助：

### 官方支持
- **官方网站**: [https://feiniao.paheng.net](https://feiniao.paheng.net)
- **使用手册**: [在线文档](https://feiniao.paheng.net/frontend/list)
- **Gitee Issues**: [提交问题](https://gitee.com/paheng/feiniao/issues)

### 社区支持
- **官方论坛**: [https://www.paheng.com/forum-2-1.html](https://www.paheng.com/forum-2-1.html)
- **QQ交流群**: 177260545
- **微信群**: 通过 QQ 群获取微信群邀请

### 提问技巧
为了获得更好的帮助，请在提问时提供：
1. **详细的问题描述**
2. **错误信息截图**
3. **服务器环境信息**
4. **复现步骤**
5. **已尝试的解决方案**

::: tip 💡 温馨提示
大部分问题都能在文档中找到解决方案，建议先查阅相关文档再寻求帮助。
:::

---

*本文档会持续更新，如果你遇到了新的问题并找到了解决方案，欢迎贡献到这个文档中！*
