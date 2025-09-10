---
title: 系统架构概览
icon: sitemap
order: 1
---

# 🏗️ 系统架构概览

飞鸟阅读采用现代化的多层架构设计，基于 ThinkPHP6 框架构建，具有模块化、可扩展、高性能的特点。

## 🎯 设计理念

### 核心原则
- **模块化设计**：清晰的功能模块划分，便于维护和扩展
- **职责分离**：前台、后台、API、作者中心各司其职
- **多域名支持**：灵活的域名绑定，支持站群运营
- **插件化扩展**：丰富的插件机制，满足个性化需求

### 技术选型
- **后端框架**：ThinkPHP 6.x - 高性能 PHP 框架
- **数据库**：MySQL 8.0 - 稳定可靠的关系型数据库
- **前端框架**：Layui + BUI - 轻量级前端解决方案
- **缓存系统**：Redis - 高性能内存缓存
- **搜索引擎**：全文索引 - 快速内容检索

## 🏛️ 整体架构

```mermaid
graph TB
    A[用户/浏览器] --> B[负载均衡器]
    B --> C[Web 服务器]
    C --> D[飞鸟阅读应用]
    
    D --> E[前台模块<br/>home]
    D --> F[后台模块<br/>admin]
    D --> G[作者模块<br/>author]
    D --> H[API模块<br/>api]
    D --> I[安装模块<br/>install]
    
    E --> J[业务逻辑层]
    F --> J
    G --> J
    H --> J
    
    J --> K[数据访问层]
    K --> L[MySQL 数据库]
    K --> M[Redis 缓存]
    
    D --> N[文件存储]
    D --> O[日志系统]
```

## 📁 目录结构

```
feiniao/
├── app/                    # 应用目录
│   ├── admin/             # 后台管理模块
│   ├── api/               # API接口模块
│   ├── author/            # 作者中心模块
│   ├── home/              # 前台展示模块
│   ├── install/           # 安装模块
│   ├── common/            # 公共模块
│   └── middleware/        # 全局中间件
├── config/                # 配置文件
├── public/                # 入口文件和静态资源
├── runtime/               # 运行时缓存
├── template/              # 模板文件
├── extend/                # 扩展类库
├── vendor/                # Composer依赖
└── addons/                # 插件目录
```

## 🔄 请求生命周期

### 1. 请求接收
```mermaid
sequenceDiagram
    participant U as 用户
    participant W as Web服务器
    participant A as 应用入口
    participant R as 路由
    
    U->>W: HTTP 请求
    W->>A: public/index.php
    A->>R: 解析路由
    R->>A: 返回路由信息
```

### 2. 应用处理
```mermaid
sequenceDiagram
    participant R as 路由
    participant M as 中间件
    participant C as 控制器
    participant S as 服务层
    participant D as 数据层
    
    R->>M: 执行中间件
    M->>C: 调用控制器
    C->>S: 业务逻辑处理
    S->>D: 数据操作
    D->>S: 返回数据
    S->>C: 返回结果
```

### 3. 响应返回
```mermaid
sequenceDiagram
    participant C as 控制器
    participant V as 视图
    participant M as 中间件
    participant U as 用户
    
    C->>V: 渲染视图
    V->>M: 返回响应
    M->>U: 输出结果
```

## 🧩 模块架构

### 前台模块 (home)
```
app/home/
├── controller/           # 控制器
│   ├── Index.php        # 首页控制器
│   ├── Book.php         # 图书控制器
│   ├── Chapter.php      # 章节控制器
│   ├── User.php         # 用户控制器
│   └── ...
├── model/               # 数据模型（继承公共模型）
├── view/                # 视图文件（通过模板引擎处理）
├── middleware/          # 模块中间件
└── route/               # 路由定义
```

**主要功能**：
- 小说展示和分类
- 用户注册和登录
- 阅读和收藏功能
- 评论和互动
- 支付和VIP功能

### 后台模块 (admin)
```
app/admin/
├── controller/          # 后台控制器
│   ├── Index.php       # 后台首页
│   ├── User.php        # 用户管理
│   ├── Book.php        # 内容管理
│   ├── System.php      # 系统设置
│   └── ...
├── model/              # 后台数据模型
├── view/               # 后台视图
├── middleware/         # 权限验证中间件
└── validate/           # 数据验证器
```

**主要功能**：
- 内容审核和管理
- 用户和权限管理
- 系统配置
- 数据统计
- 插件管理

### 作者模块 (author)
```
app/author/
├── controller/          # 作者控制器
│   ├── Index.php       # 作者首页
│   ├── Book.php        # 作品管理
│   ├── Chapter.php     # 章节管理
│   ├── Income.php      # 收益统计
│   └── ...
├── model/              # 作者相关模型
├── view/               # 作者中心视图
└── middleware/         # 作者权限中间件
```

**主要功能**：
- 作品创建和管理
- 章节编辑和发布
- 收益统计
- 读者互动
- 合同管理

### API模块 (api)
```
app/api/
├── controller/
│   └── v1/             # API版本管理
│       ├── User.php    # 用户API
│       ├── Book.php    # 图书API
│       └── ...
├── middleware/         # API中间件
│   ├── Auth.php       # 认证中间件
│   └── CrossOrigin.php # 跨域中间件
└── route/             # API路由
```

**主要功能**：
- RESTful API接口
- 移动端支持
- 第三方集成
- 数据同步

## 🗄️ 数据层架构

### 数据模型设计
```mermaid
erDiagram
    USER ||--o{ BOOK : creates
    USER ||--o{ CHAPTER : writes
    USER ||--o{ COMMENT : makes
    USER ||--o{ FAVORITE : has
    
    BOOK ||--o{ CHAPTER : contains
    BOOK ||--o{ COMMENT : receives
    BOOK ||--o{ FAVORITE : in
    
    CHAPTER ||--o{ COMMENT : on
    
    ADMIN ||--o{ LOG : generates
```

### 缓存策略
```mermaid
graph LR
    A[用户请求] --> B{缓存检查}
    B -->|命中| C[返回缓存数据]
    B -->|未命中| D[查询数据库]
    D --> E[更新缓存]
    E --> F[返回数据]
    
    G[数据更新] --> H[清除相关缓存]
```

**缓存层次**：
1. **页面缓存**：完整页面的HTML缓存
2. **数据缓存**：数据库查询结果缓存
3. **对象缓存**：业务对象缓存
4. **文件缓存**：静态文件缓存

## 🔐 安全架构

### 安全层次
```mermaid
graph TD
    A[网络层安全] --> B[应用层安全]
    B --> C[数据层安全]
    
    A --> A1[防火墙]
    A --> A2[DDoS防护]
    A --> A3[SSL/TLS]
    
    B --> B1[身份认证]
    B --> B2[权限控制]
    B --> B3[输入验证]
    B --> B4[XSS防护]
    B --> B5[CSRF防护]
    
    C --> C1[数据加密]
    C --> C2[备份策略]
    C --> C3[访问控制]
```

### 认证授权流程
```mermaid
sequenceDiagram
    participant U as 用户
    participant A as 应用
    participant T as Token服务
    participant D as 数据库
    
    U->>A: 登录请求
    A->>D: 验证用户
    D->>A: 返回用户信息
    A->>T: 生成Token
    T->>A: 返回Token
    A->>U: 登录成功
    
    U->>A: 业务请求(带Token)
    A->>T: 验证Token
    T->>A: Token有效
    A->>U: 返回业务数据
```

## 🔌 插件架构

### 插件系统设计
```mermaid
graph TB
    A[核心系统] --> B[插件管理器]
    B --> C[插件接口]
    C --> D[插件A]
    C --> E[插件B]
    C --> F[插件C]
    
    D --> G[Hook事件]
    E --> G
    F --> G
    
    G --> H[事件分发]
    H --> I[插件执行]
```

**插件机制**：
- **Hook 系统**：在关键节点提供钩子
- **事件分发**：基于事件的插件触发
- **依赖管理**：插件间依赖关系管理
- **生命周期**：插件的安装、启用、禁用、卸载

## 📊 性能优化

### 优化策略
```mermaid
mindmap
  root((性能优化))
    数据库优化
      索引优化
      查询优化
      读写分离
      分库分表
    缓存优化
      多级缓存
      缓存预热
      缓存更新策略
    代码优化
      OPcache
      自动加载优化
      减少内存使用
    静态资源优化
      CDN加速
      文件压缩
      浏览器缓存
```

### 监控指标
- **响应时间**：页面加载时间
- **并发能力**：同时在线用户数
- **资源使用**：CPU、内存、磁盘使用率
- **数据库性能**：查询时间、连接数
- **缓存命中率**：缓存效果监控

## 🚀 扩展性设计

### 水平扩展
```mermaid
graph LR
    A[负载均衡器] --> B[Web服务器1]
    A --> C[Web服务器2]
    A --> D[Web服务器N]
    
    B --> E[共享存储]
    C --> E
    D --> E
    
    B --> F[数据库集群]
    C --> F
    D --> F
```

### 垂直扩展
- **服务器升级**：增加CPU、内存、存储
- **数据库优化**：索引优化、查询优化
- **缓存增强**：增加缓存层次和容量

## 🎯 最佳实践

### 开发规范
1. **代码规范**：遵循 PSR 标准
2. **命名规范**：统一的命名约定
3. **注释规范**：完整的代码注释
4. **版本控制**：Git 工作流规范

### 部署规范
1. **环境隔离**：开发、测试、生产环境分离
2. **自动化部署**：CI/CD 流水线
3. **配置管理**：环境配置分离
4. **监控告警**：完善的监控体系

### 运维规范
1. **备份策略**：定期数据备份
2. **日志管理**：日志收集和分析
3. **性能监控**：实时性能监控
4. **安全更新**：及时的安全补丁

## 🔗 相关文档

- [📊 数据库设计](./database.md) - 详细的数据库结构
- [🧩 模块结构](./module-structure.md) - 各模块详细说明
- [🔐 安全机制](./security.md) - 安全设计详解
- [🛠️ 开发环境](../guide/development/environment.md) - 开发环境搭建
- [🔌 插件开发](../guide/development/plugin-development.md) - 插件开发指南
