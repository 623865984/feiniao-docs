---
title: 数据库设计
icon: database
order: 2
---

# 🗄️ 数据库设计

飞鸟阅读采用合理的数据库设计，支持大量数据存储和高效查询。

## 📊 数据库概览

### 核心表结构

飞鸟阅读主要包含以下核心数据表：

- **用户系统**: 用户、管理员、作者信息
- **内容系统**: 图书、章节、分类管理
- **交互系统**: 评论、收藏、点赞数据
- **支付系统**: 订单、VIP、充值记录
- **系统管理**: 配置、日志、权限数据

## 👥 用户相关表

### 用户表 (fn_user)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 用户ID | PRIMARY |
| username | varchar(50) | 用户名 | UNIQUE |
| email | varchar(100) | 邮箱 | INDEX |
| mobile | varchar(20) | 手机号 | INDEX |
| password | varchar(255) | 密码 | |
| nickname | varchar(50) | 昵称 | |
| avatar | varchar(255) | 头像 | |
| status | tinyint(1) | 状态 | INDEX |
| last_login_time | int(11) | 最后登录时间 | |
| create_time | int(11) | 创建时间 | INDEX |
| update_time | int(11) | 更新时间 | |

### 管理员表 (fn_admin)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 管理员ID | PRIMARY |
| username | varchar(50) | 用户名 | UNIQUE |
| password | varchar(255) | 密码 | |
| nickname | varchar(50) | 昵称 | |
| email | varchar(100) | 邮箱 | |
| status | tinyint(1) | 状态 | INDEX |
| last_login_time | int(11) | 最后登录时间 | |
| create_time | int(11) | 创建时间 | INDEX |

### 作者表 (fn_author)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 作者ID | PRIMARY |
| user_id | int(11) | 关联用户ID | UNIQUE |
| pen_name | varchar(50) | 笔名 | INDEX |
| real_name | varchar(50) | 真实姓名 | |
| phone | varchar(20) | 手机号 | |
| id_card | varchar(20) | 身份证 | |
| bank_info | text | 银行卡信息 | |
| status | tinyint(1) | 状态 | INDEX |
| verify_status | tinyint(1) | 认证状态 | INDEX |
| create_time | int(11) | 创建时间 | INDEX |

## 📚 内容相关表

### 图书表 (fn_book)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 图书ID | PRIMARY |
| title | varchar(255) | 书名 | INDEX |
| author_id | int(11) | 作者ID | INDEX |
| author_name | varchar(50) | 作者名 | INDEX |
| category_id | int(11) | 分类ID | INDEX |
| cover | varchar(255) | 封面图 | |
| intro | text | 简介 | |
| tags | varchar(255) | 标签 | |
| status | tinyint(1) | 状态 | INDEX |
| is_vip | tinyint(1) | 是否VIP | INDEX |
| word_count | int(11) | 字数 | INDEX |
| chapter_count | int(11) | 章节数 | |
| view_count | int(11) | 浏览量 | INDEX |
| like_count | int(11) | 点赞数 | INDEX |
| collect_count | int(11) | 收藏数 | INDEX |
| comment_count | int(11) | 评论数 | |
| create_time | int(11) | 创建时间 | INDEX |
| update_time | int(11) | 更新时间 | INDEX |

### 章节表 (fn_chapter)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 章节ID | PRIMARY |
| book_id | int(11) | 图书ID | INDEX |
| title | varchar(255) | 章节标题 | INDEX |
| content | longtext | 章节内容 | |
| word_count | int(11) | 字数 | |
| sort | int(11) | 排序 | INDEX |
| is_vip | tinyint(1) | 是否VIP | INDEX |
| price | decimal(10,2) | 价格 | |
| status | tinyint(1) | 状态 | INDEX |
| view_count | int(11) | 浏览量 | |
| create_time | int(11) | 创建时间 | INDEX |
| update_time | int(11) | 更新时间 | |

### 分类表 (fn_category)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 分类ID | PRIMARY |
| name | varchar(50) | 分类名称 | INDEX |
| parent_id | int(11) | 父分类ID | INDEX |
| sort | int(11) | 排序 | INDEX |
| status | tinyint(1) | 状态 | INDEX |
| create_time | int(11) | 创建时间 | |

## 💬 交互相关表

### 评论表 (fn_comment)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 评论ID | PRIMARY |
| user_id | int(11) | 用户ID | INDEX |
| book_id | int(11) | 图书ID | INDEX |
| chapter_id | int(11) | 章节ID | INDEX |
| parent_id | int(11) | 父评论ID | INDEX |
| content | text | 评论内容 | |
| like_count | int(11) | 点赞数 | |
| status | tinyint(1) | 状态 | INDEX |
| create_time | int(11) | 创建时间 | INDEX |

### 收藏表 (fn_favorite)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 收藏ID | PRIMARY |
| user_id | int(11) | 用户ID | INDEX |
| book_id | int(11) | 图书ID | INDEX |
| create_time | int(11) | 创建时间 | INDEX |

### 阅读历史表 (fn_read_history)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 记录ID | PRIMARY |
| user_id | int(11) | 用户ID | INDEX |
| book_id | int(11) | 图书ID | INDEX |
| chapter_id | int(11) | 章节ID | INDEX |
| read_time | int(11) | 阅读时间 | INDEX |
| create_time | int(11) | 创建时间 | |

## 💰 支付相关表

### 订单表 (fn_order)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 订单ID | PRIMARY |
| order_no | varchar(32) | 订单号 | UNIQUE |
| user_id | int(11) | 用户ID | INDEX |
| type | tinyint(1) | 订单类型 | INDEX |
| amount | decimal(10,2) | 金额 | |
| status | tinyint(1) | 状态 | INDEX |
| pay_method | varchar(20) | 支付方式 | INDEX |
| pay_time | int(11) | 支付时间 | INDEX |
| create_time | int(11) | 创建时间 | INDEX |

### VIP记录表 (fn_vip_log)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 记录ID | PRIMARY |
| user_id | int(11) | 用户ID | INDEX |
| type | tinyint(1) | 类型 | INDEX |
| days | int(11) | 天数 | |
| start_time | int(11) | 开始时间 | INDEX |
| end_time | int(11) | 结束时间 | INDEX |
| create_time | int(11) | 创建时间 | |

## ⚙️ 系统相关表

### 系统配置表 (fn_config)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 配置ID | PRIMARY |
| name | varchar(50) | 配置名 | UNIQUE |
| value | text | 配置值 | |
| type | varchar(20) | 配置类型 | |
| group | varchar(20) | 配置分组 | INDEX |
| create_time | int(11) | 创建时间 | |

### 操作日志表 (fn_admin_log)

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | int(11) | 日志ID | PRIMARY |
| admin_id | int(11) | 管理员ID | INDEX |
| username | varchar(50) | 用户名 | INDEX |
| url | varchar(255) | 访问URL | |
| method | varchar(10) | 请求方法 | INDEX |
| ip | varchar(50) | IP地址 | INDEX |
| user_agent | varchar(255) | 用户代理 | |
| create_time | int(11) | 创建时间 | INDEX |

## 🔍 索引策略

### 主要索引

1. **主键索引**: 所有表的 id 字段
2. **唯一索引**: 用户名、邮箱、订单号等
3. **普通索引**: 外键、状态、时间等常用查询字段
4. **复合索引**: 多字段组合查询

### 性能优化索引

```sql
-- 图书查询优化
ALTER TABLE fn_book ADD INDEX idx_category_status (category_id, status);
ALTER TABLE fn_book ADD INDEX idx_author_status (author_id, status);

-- 章节查询优化
ALTER TABLE fn_chapter ADD INDEX idx_book_sort (book_id, sort);
ALTER TABLE fn_chapter ADD INDEX idx_book_status (book_id, status);

-- 用户行为优化
ALTER TABLE fn_favorite ADD INDEX idx_user_book (user_id, book_id);
ALTER TABLE fn_read_history ADD INDEX idx_user_time (user_id, read_time);
```

## 🗃️ 分表策略

### 大数据表分表

对于数据量较大的表，采用分表策略：

```sql
-- 按月分表的阅读历史
CREATE TABLE fn_read_history_202401 LIKE fn_read_history;
CREATE TABLE fn_read_history_202402 LIKE fn_read_history;

-- 按用户ID分表的收藏
CREATE TABLE fn_favorite_0 LIKE fn_favorite;
CREATE TABLE fn_favorite_1 LIKE fn_favorite;
```

### 分表路由规则

```php
// 按时间分表
$table = 'fn_read_history_' . date('Ym');

// 按用户ID分表
$tableIndex = $userId % 10;
$table = "fn_favorite_{$tableIndex}";
```

## 🔄 数据迁移

### 版本升级脚本

```sql
-- v1.1.0 升级脚本
ALTER TABLE fn_book ADD COLUMN tags varchar(255) AFTER intro;
ALTER TABLE fn_user ADD COLUMN mobile varchar(20) AFTER email;

-- 创建新表
CREATE TABLE fn_user_level (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  exp_min int(11) DEFAULT 0,
  exp_max int(11) DEFAULT 0,
  privileges text,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 数据迁移脚本

```php
// 数据格式化迁移
$users = Db::table('fn_user')->select();
foreach ($users as $user) {
    // 格式化历史数据
    Db::table('fn_user')
        ->where('id', $user['id'])
        ->update([
            'mobile' => formatMobile($user['phone']),
            'update_time' => time()
        ]);
}
```

## 🛡️ 数据安全

### 备份策略

```bash
#!/bin/bash
# 每日备份脚本
DATE=$(date +%Y%m%d)
mysqldump -u root -p feiniao > /backup/feiniao_$DATE.sql
gzip /backup/feiniao_$DATE.sql

# 删除7天前的备份
find /backup -name "feiniao_*.sql.gz" -mtime +7 -delete
```

### 敏感数据加密

```php
// 用户密码加密
$password = password_hash($rawPassword, PASSWORD_DEFAULT);

// 敏感信息加密存储
$encrypted = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
```

## 📊 查询优化

### 常用查询优化

```sql
-- 热门图书查询
SELECT b.*, c.name as category_name 
FROM fn_book b 
LEFT JOIN fn_category c ON b.category_id = c.id 
WHERE b.status = 1 
ORDER BY b.view_count DESC 
LIMIT 10;

-- 用户阅读历史
SELECT h.*, b.title, b.cover 
FROM fn_read_history h 
LEFT JOIN fn_book b ON h.book_id = b.id 
WHERE h.user_id = ? 
ORDER BY h.read_time DESC 
LIMIT 20;
```

### 慢查询监控

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- 分析慢查询
SHOW PROCESSLIST;
EXPLAIN SELECT * FROM fn_book WHERE title LIKE '%关键词%';
```

## 🎯 最佳实践

### 1. 表设计原则

- 合理使用数据类型，节省存储空间
- 重要字段添加注释说明
- 外键约束保证数据完整性
- 状态字段使用枚举值

### 2. 索引使用建议

- 查询频繁的字段添加索引
- 避免过多索引影响写入性能
- 定期分析索引使用情况
- 删除无用索引

### 3. 数据维护

- 定期清理过期数据
- 监控表空间使用情况
- 及时处理数据碎片
- 制定数据归档策略

::: tip 💡 小贴士
数据库设计要考虑未来的扩展性，预留足够的字段长度和扩展空间。
:::

## 📚 相关文档

- [🏗️ 系统架构概览](./overview.md)
- [🧩 模块结构设计](./module-structure.md)
- [🔐 安全机制](./security.md)
- [⚡ 性能优化](../troubleshooting/performance.md)
