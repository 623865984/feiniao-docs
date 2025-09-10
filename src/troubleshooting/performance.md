---
title: 性能优化指南
icon: gauge
order: 2
---

# ⚡ 性能优化指南

本指南提供飞鸟阅读系统的性能优化方案，帮助提升网站响应速度和用户体验。

## 📊 性能监控

### 关键性能指标
- **页面加载时间**: < 3秒
- **首字节时间(TTFB)**: < 500ms  
- **数据库查询时间**: < 100ms
- **并发用户数**: > 1000
- **CPU使用率**: < 70%
- **内存使用率**: < 80%

## 🗄️ 数据库优化

### 索引优化
```sql
-- 为常用查询添加索引
ALTER TABLE fn_book ADD INDEX idx_category_status (category_id, status);
ALTER TABLE fn_book ADD INDEX idx_author_update_time (author_id, update_time);
ALTER TABLE fn_chapter ADD INDEX idx_book_sort (book_id, sort);

-- 复合索引优化
ALTER TABLE fn_user ADD INDEX idx_status_create_time (status, create_time);
```

### 查询优化
```php
// 避免 N+1 查询问题
$books = Book::with(['author', 'category'])->get();

// 使用分页减少内存占用
$books = Book::paginate(20);

// 只查询需要的字段
$books = Book::select('id', 'title', 'author_name')->get();
```

## 💾 缓存优化

### Redis 缓存配置
```php
// config/cache.php
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
            'expire' => 3600,
            'persistent' => true,
            'prefix' => 'feiniao:',
        ],
    ],
];
```

### 多级缓存策略
```php
class CacheService
{
    /**
     * 多级缓存获取
     */
    public function get($key, $callback, $ttl = 3600)
    {
        // 1. 内存缓存
        if ($data = $this->getFromMemory($key)) {
            return $data;
        }
        
        // 2. Redis缓存
        if ($data = $this->getFromRedis($key)) {
            $this->setToMemory($key, $data);
            return $data;
        }
        
        // 3. 数据库查询
        $data = $callback();
        $this->setToRedis($key, $data, $ttl);
        $this->setToMemory($key, $data);
        
        return $data;
    }
}
```

## 🔧 PHP 性能优化

### OPcache 配置
```ini
; php.ini
[opcache]
opcache.enable=1
opcache.enable_cli=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=20000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
opcache.save_comments=0
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
pm.process_idle_timeout = 60
```

## 📦 静态资源优化

### 文件压缩
```nginx
# Nginx 配置
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/json
    application/xml+rss;
```

### CDN 加速
```php
// 配置CDN地址
'cdn_url' => 'https://cdn.example.com',

// 静态资源URL生成
function asset_url($path) {
    $cdnUrl = config('cdn_url');
    return $cdnUrl . '/' . ltrim($path, '/');
}
```

## 🚀 更多优化建议

详细的性能优化方案正在完善中...

## 📞 性能问题反馈

如遇性能问题，请联系：
- QQ交流群：177260545
- Gitee Issues：提交性能相关问题
