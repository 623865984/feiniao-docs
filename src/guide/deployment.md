---
title: 部署指南
icon: cloud
order: 4
---

# ☁️ 部署指南

本指南介绍如何将飞鸟阅读部署到生产环境。

## 🎯 部署准备

### 环境要求
- **服务器**: 1核2G内存（最低配置）
- **PHP**: 7.4+
- **MySQL**: 5.7+
- **Web服务器**: Nginx/Apache
- **域名**: 已备案的域名

## 🚀 快速部署

### 1. 上传源码
```bash
# 上传项目文件到服务器
scp -r feiniao/ user@server:/var/www/
```

### 2. 配置权限
```bash
chmod -R 755 /var/www/feiniao
chmod -R 777 /var/www/feiniao/runtime
chmod -R 777 /var/www/feiniao/config
```

### 3. 配置域名
将域名指向 `public` 目录

### 4. 运行安装
访问 `http://yourdomain.com/install` 完成安装

## 🔧 高级部署

### Docker 部署
```dockerfile
FROM php:8.0-apache
COPY . /var/www/html
RUN chmod -R 777 /var/www/html/runtime
```

### 负载均衡
使用 Nginx 配置多台服务器负载均衡

## 📊 监控维护

### 日志监控
定期检查系统日志和错误日志

### 备份策略
- 数据库每日备份
- 代码文件定期备份
- 用户上传文件备份

## 🔐 安全配置

- 配置HTTPS证书
- 设置防火墙规则
- 定期更新系统补丁

## 📞 部署支持

如需部署支持，请联系：
- QQ交流群：177260545
- 官方技术支持（收费服务）
