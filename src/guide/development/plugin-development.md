---
title: 插件开发指南
icon: puzzle-piece
order: 3
---

# 🔌 插件开发指南

飞鸟阅读提供了强大的插件系统，允许开发者扩展系统功能而无需修改核心代码。

## 📋 插件系统概述

### 插件特点

- **热插拔**: 支持运行时启用/禁用插件
- **事件驱动**: 基于 Hook 机制的事件系统
- **独立性**: 插件之间相互独立，不影响核心功能
- **可配置**: 每个插件都有独立的配置界面

### 插件目录结构

```
addons/
├── demo/                    # 插件目录
│   ├── Plugin.php          # 插件主文件
│   ├── info.ini            # 插件信息
│   ├── config.php          # 插件配置
│   ├── install.sql         # 安装 SQL
│   ├── controller/         # 控制器
│   ├── model/              # 模型
│   ├── view/               # 视图
│   └── static/             # 静态资源
```

## 🚀 创建第一个插件

### 1. 创建插件目录

```bash
mkdir addons/demo
cd addons/demo
```

### 2. 创建插件信息文件

创建 `info.ini` 文件：

```ini
[plugin]
name = demo
title = 演示插件
description = 这是一个演示插件
version = 1.0.0
author = 开发者
website = https://example.com
```

### 3. 创建插件主文件

创建 `Plugin.php` 文件：

```php
<?php

namespace addons\demo;

use app\common\library\Plugin;

/**
 * 演示插件
 */
class Plugin extends \app\common\library\Plugin
{
    /**
     * 插件信息
     */
    public $info = [
        'name' => 'demo',
        'title' => '演示插件',
        'description' => '这是一个演示插件',
        'version' => '1.0.0',
        'author' => '开发者',
    ];

    /**
     * 插件安装
     */
    public function install()
    {
        // 执行安装逻辑
        return true;
    }

    /**
     * 插件卸载
     */
    public function uninstall()
    {
        // 执行卸载逻辑
        return true;
    }

    /**
     * 插件启用
     */
    public function enable()
    {
        // 执行启用逻辑
        return true;
    }

    /**
     * 插件禁用
     */
    public function disable()
    {
        // 执行禁用逻辑
        return true;
    }
}
```

## 🪝 Hook 系统

### Hook 事件列表

飞鸟阅读在关键节点提供了 Hook 事件：

| Hook 名称 | 触发时机 | 参数 |
|-----------|----------|------|
| `user_login_before` | 用户登录前 | `$user` |
| `user_login_after` | 用户登录后 | `$user` |
| `book_create_before` | 图书创建前 | `$data` |
| `book_create_after` | 图书创建后 | `$book` |
| `chapter_publish_before` | 章节发布前 | `$chapter` |
| `chapter_publish_after` | 章节发布后 | `$chapter` |

### 注册 Hook 事件

在插件主文件中注册事件：

```php
public function hooks()
{
    return [
        'user_login_after' => 'onUserLogin',
        'book_create_after' => 'onBookCreate',
    ];
}

/**
 * 用户登录后事件
 */
public function onUserLogin($user)
{
    // 记录登录日志
    Log::info('用户登录', ['user_id' => $user['id']]);
}

/**
 * 图书创建后事件
 */
public function onBookCreate($book)
{
    // 发送通知
    $this->sendNotification($book);
}
```

## 🎛️ 插件配置

### 配置文件

创建 `config.php` 文件：

```php
<?php

return [
    [
        'name' => 'api_key',
        'title' => 'API密钥',
        'type' => 'string',
        'content' => '',
        'tip' => '请输入第三方服务的API密钥',
        'rule' => 'required',
    ],
    [
        'name' => 'enable_log',
        'title' => '启用日志',
        'type' => 'radio',
        'content' => [
            '1' => '启用',
            '0' => '禁用',
        ],
        'value' => '1',
        'tip' => '是否启用详细日志记录',
    ],
    [
        'name' => 'max_items',
        'title' => '最大条目数',
        'type' => 'number',
        'content' => '',
        'value' => '100',
        'tip' => '单次处理的最大条目数',
    ],
];
```

### 获取配置

在插件中获取配置值：

```php
// 获取配置值
$apiKey = $this->getConfig('api_key');
$enableLog = $this->getConfig('enable_log');

// 设置配置值
$this->setConfig('api_key', 'new_api_key');
```

## 🗄️ 数据库操作

### 安装 SQL

创建 `install.sql` 文件：

```sql
CREATE TABLE IF NOT EXISTS `fn_demo_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content` text,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 模型操作

创建模型文件 `model/DemoData.php`：

```php
<?php

namespace addons\demo\model;

use think\Model;

class DemoData extends Model
{
    protected $name = 'demo_data';
    
    // 自动时间戳
    protected $autoWriteTimestamp = true;
    
    /**
     * 获取列表
     */
    public function getList($where = [], $limit = 10)
    {
        return $this->where($where)
                    ->limit($limit)
                    ->order('id desc')
                    ->select();
    }
}
```

## 🎨 前端界面

### 控制器

创建控制器 `controller/Index.php`：

```php
<?php

namespace addons\demo\controller;

use think\Controller;
use addons\demo\model\DemoData;

class Index extends Controller
{
    /**
     * 首页
     */
    public function index()
    {
        $model = new DemoData();
        $list = $model->getList();
        
        $this->assign('list', $list);
        return $this->fetch();
    }
    
    /**
     * 添加数据
     */
    public function add()
    {
        if ($this->request->isPost()) {
            $data = $this->request->post();
            $model = new DemoData();
            
            if ($model->save($data)) {
                $this->success('添加成功');
            } else {
                $this->error('添加失败');
            }
        }
        
        return $this->fetch();
    }
}
```

### 视图模板

创建视图 `view/index.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <title>演示插件</title>
    <link rel="stylesheet" href="/static/plugins/layui/css/layui.css">
</head>
<body>
    <div class="layui-container">
        <h1>演示插件</h1>
        
        <table class="layui-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>内容</th>
                    <th>创建时间</th>
                </tr>
            </thead>
            <tbody>
                {volist name="list" id="item"}
                <tr>
                    <td>{$item.id}</td>
                    <td>{$item.name}</td>
                    <td>{$item.content}</td>
                    <td>{$item.create_time|date='Y-m-d H:i:s'}</td>
                </tr>
                {/volist}
            </tbody>
        </table>
    </div>
</body>
</html>
```

## 🔐 权限控制

### 权限检查

在控制器中添加权限检查：

```php
public function _initialize()
{
    parent::_initialize();
    
    // 检查用户权限
    if (!$this->checkAuth()) {
        $this->error('权限不足');
    }
}

private function checkAuth()
{
    // 检查用户是否登录
    $user = session('user');
    if (!$user) {
        return false;
    }
    
    // 检查用户角色
    if ($user['role'] !== 'admin') {
        return false;
    }
    
    return true;
}
```

## 📦 插件打包

### 打包脚本

创建 `build.php` 脚本：

```php
<?php

$pluginName = 'demo';
$version = '1.0.0';

// 创建打包目录
$buildDir = "build/{$pluginName}-{$version}";
if (!is_dir($buildDir)) {
    mkdir($buildDir, 0755, true);
}

// 复制文件
$files = [
    'Plugin.php',
    'info.ini',
    'config.php',
    'install.sql',
    'controller/',
    'model/',
    'view/',
    'static/',
];

foreach ($files as $file) {
    if (file_exists($file)) {
        if (is_dir($file)) {
            copyDir($file, "{$buildDir}/{$file}");
        } else {
            copy($file, "{$buildDir}/{$file}");
        }
    }
}

// 创建压缩包
$zip = new ZipArchive();
$zipFile = "build/{$pluginName}-{$version}.zip";

if ($zip->open($zipFile, ZipArchive::CREATE) === TRUE) {
    addDirToZip($buildDir, $zip, $buildDir);
    $zip->close();
    echo "插件打包完成：{$zipFile}\n";
} else {
    echo "打包失败\n";
}
```

## 🧪 插件测试

### 单元测试

创建测试文件 `tests/PluginTest.php`：

```php
<?php

use PHPUnit\Framework\TestCase;
use addons\demo\Plugin;

class PluginTest extends TestCase
{
    public function testInstall()
    {
        $plugin = new Plugin();
        $result = $plugin->install();
        
        $this->assertTrue($result);
    }
    
    public function testConfig()
    {
        $plugin = new Plugin();
        $plugin->setConfig('test_key', 'test_value');
        
        $value = $plugin->getConfig('test_key');
        $this->assertEquals('test_value', $value);
    }
}
```

### 运行测试

```bash
# 运行插件测试
phpunit tests/PluginTest.php
```

## 📚 最佳实践

### 1. 命名规范

- 插件目录使用小写字母和下划线
- 类名使用大驼峰命名法
- 方法名使用小驼峰命名法

### 2. 错误处理

```php
try {
    // 业务逻辑
    $result = $this->doSomething();
} catch (Exception $e) {
    Log::error('插件错误：' . $e->getMessage());
    return false;
}
```

### 3. 国际化支持

```php
// 使用语言包
echo lang('plugin.demo.welcome');

// 在语言包文件中定义
return [
    'welcome' => '欢迎使用演示插件',
];
```

### 4. 性能优化

- 避免在循环中执行数据库查询
- 使用缓存减少重复计算
- 合理使用事件，避免过度监听

## 🎯 示例插件

完整的示例插件可以在以下位置找到：

- 简单插件：`addons/demo/`
- 复杂插件：`addons/payment/`
- 第三方集成：`addons/wechat/`

## 📞 获取帮助

如果在插件开发过程中遇到问题：

- 查看官方文档和示例代码
- 在开发者论坛提问
- 加入 QQ 交流群：177260545

::: tip 💡 小贴士
建议先从简单的插件开始，逐步熟悉插件系统的各个组件和工作机制。
:::
