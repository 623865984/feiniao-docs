---
title: 编码规范
icon: code
order: 2
---

# 📝 编码规范

遵循统一的编码规范有助于提高代码质量和团队协作效率。

## 🎯 基本原则

- 遵循 PSR-12 编码标准
- 使用有意义的命名
- 保持代码简洁清晰
- 添加必要的注释

## 📋 命名规范

### 类名
使用大驼峰命名法：
```php
class UserController
class BookService
class ChapterModel
```

### 方法名
使用小驼峰命名法：
```php
public function getUserInfo()
public function createBook()
public function updateChapter()
```

### 变量名
使用小驼峰命名法：
```php
$userName = 'admin';
$bookList = [];
$chapterCount = 10;
```

## 💻 代码格式

### 缩进和空格
- 使用4个空格缩进
- 操作符前后加空格
- 逗号后加空格

```php
if ($user && $user['status'] == 1) {
    $books = Book::where('author_id', $user['id'])->select();
}
```

### 注释规范
```php
/**
 * 获取用户信息
 * @param int $userId 用户ID
 * @return array 用户信息
 */
public function getUserInfo($userId)
{
    // 查询用户基本信息
    $user = User::find($userId);
    
    return $user ? $user->toArray() : [];
}
```

## 🚀 更多规范

详细的编码规范文档正在完善中...

## 📞 规范建议

如有编码规范建议，欢迎联系：
- QQ交流群：177260545
- Gitee Issues：提交建议
