# RAGFlow Web 架构文档

## 概述

RAGFlow 的 Web 前端是一个现代化的单页应用程序，为用户提供了一个直观的界面来管理知识库、进行对话交互、配置智能体工作流等功能。应用名称为"知识引擎"，集成了检索增强生成(RAG)的核心能力，提供了一整套知识管理和智能交互解决方案。

## 技术栈

### 核心框架

- **UmiJS**: 基于 React 的企业级前端开发框架，提供了路由、状态管理等完整解决方案
- **React 18**: 用于构建用户界面的 JavaScript 库
- **TypeScript**: 为 JavaScript 提供类型系统，增强代码可维护性

### UI 组件库

- **Ant Design**: 使用 `@ant-design/pro-components` 提供企业级 UI 组件
- **Radix UI**: 提供无样式但可访问的组件原语
- **Tailwind CSS**: 用于快速构建自定义设计的实用优先的 CSS 框架

### 状态管理

- **Zustand**: 轻量级状态管理库，简化复杂状态逻辑
- **React Query**: 用于数据获取、缓存和状态更新（通过 @tanstack/react-query）

### 数据可视化

- **AntV G2/G6**: 用于图表和图形可视化
- **Recharts**: 用于响应式图表组件
- **XY Flow**: 用于智能体工作流画布的可视化和交互

### 编辑器集成

- **Monaco Editor**: 提供代码编辑功能，类似于 VS Code
- **Lexical**: 用于富文本编辑

### 国际化与主题

- **i18next**: 实现多语言支持
- **自定义主题系统**: 支持亮色/暗色模式切换

## 项目结构

```
web/
├── .husky/             # Git hooks 配置
├── node_modules/       # 依赖库
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 图像和其他静态资源
│   ├── components/     # 可复用 UI 组件
│   ├── constants/      # 常量定义
│   ├── hooks/          # 自定义 React hooks
│   ├── interfaces/     # TypeScript 类型定义
│   ├── layouts/        # 页面布局组件
│   ├── less/           # 样式文件
│   ├── lib/            # 工具库
│   ├── locales/        # 国际化语言文件
│   ├── pages/          # 应用页面
│   ├── services/       # API 服务客户端
│   ├── theme/          # 主题相关文件
│   ├── utils/          # 实用工具函数
│   ├── wrappers/       # 高阶组件
│   ├── app.tsx         # 应用入口
│   ├── conf.json       # 应用配置
│   └── routes.ts       # 路由配置
├── .eslintrc.js        # ESLint 配置
├── .gitignore          # Git 忽略配置
├── .npmrc              # npm 配置
├── .prettierignore     # Prettier 忽略配置
├── .prettierrc         # Prettier 配置
├── .umirc.ts           # UmiJS 配置
├── externals.d.ts      # 外部类型声明
├── jest-setup.ts       # Jest 测试设置
├── jest.config.ts      # Jest 测试配置
├── package-lock.json   # 锁定的依赖版本
├── package.json        # 项目依赖和脚本
├── tailwind.config.js  # Tailwind CSS 配置
├── tailwind.css        # Tailwind CSS 样式
├── tsconfig.json       # TypeScript 配置
└── typings.d.ts        # 全局类型定义
```

## 核心功能模块

### 1. 知识库管理

知识库管理是 RAGFlow 的核心功能之一，允许用户创建、管理和检索知识库内容。

**主要路径**:
- `/datasets` - 知识库列表
- `/dataset/dataset/:id` - 单个知识库详情

**关键组件**:
- 文档上传和处理
- 知识图谱可视化 
- 知识测试和评估

### 2. 对话系统

对话系统提供了基于知识库的智能对话能力，支持多轮对话和引用功能。

**主要路径**:
- `/next-chats` - 对话列表
- `/next-chat` - 单个对话会话

**关键功能**:
- 多轮对话记忆
- 基于检索的问答
- 引用显示和验证

### 3. 搜索功能

搜索功能提供了强大的知识检索能力，支持向量搜索和全文搜索。

**主要路径**:
- `/next-searches` - 搜索配置列表
- `/next-search` - 搜索界面

**关键特性**:
- 相似度阈值调整
- 向量相似度权重设置
- 重排序模型集成

### 4. 智能体工作流

智能体工作流允许用户通过可视化界面创建和管理复杂的工作流程。

**主要路径**:
- `/agents` - 智能体列表
- `/agent-templates` - 智能体模板
- `/agent/:id` - 单个智能体设计器

**核心功能**:
- 可视化工作流编辑
- 节点配置和连接
- 工作流执行和监控

### 5. 文件管理

文件管理系统支持各种文件类型的上传、管理和查看。

**主要路径**:
- `/files` - 文件浏览器
- `/document/:id` - 文档查看器

**支持功能**:
- 文件上传和组织
- 文档预览
- 文件夹结构管理

### 6. 用户设置

用户设置模块提供了个性化配置和系统管理功能。

**主要路径**:
- `/profile-setting/profile` - 个人资料管理
- `/profile-setting/team` - 团队管理
- `/profile-setting/model` - 模型配置
- `/profile-setting/mcp` - MCP 服务器设置

## 前后端交互

前端通过模块化的服务层与后端 API 进行通信，主要服务模块包括：

- **chat-service.ts** - 对话功能
- **knowledge-service.ts** - 知识库操作
- **agent-service.ts** - 智能体操作
- **user-service.ts** - 用户和认证
- **file-manager-service.ts** - 文件管理
- **mcp-server-service.ts** - MCP 服务器集成

这些服务封装了 HTTP 请求逻辑，使用 axios 库进行网络请求，并处理数据格式转换和错误处理。

## 国际化支持

应用支持多语言切换，通过 i18next 库实现。支持的语言包括：

- 英文（默认）
- 简体中文
- 繁体中文
- 日语
- 德语
- 西班牙语
- 印尼语
- 越南语
- 葡萄牙语（巴西）

语言配置在 `web/src/locales/config.ts` 中定义，各语言的翻译文件存储在独立文件中，如 `en.ts`、`zh.ts` 等。

## 主题系统

应用支持亮色和暗色主题，使用自定义主题提供者实现。主题系统基于：

- CSS 变量实现主题颜色
- React Context API 管理主题状态
- 本地存储保存用户偏好

主题切换通过用户设置界面提供，应用也支持根据系统主题偏好自动切换的"系统"主题选项。

## 开发流程

### 开发环境设置

```bash
# 安装依赖
cd web
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 主要工具

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Jest**: 单元测试
- **Husky**: Git hooks 管理

## 部署

前端应用可以独立部署，也可以作为整个 RAGFlow 系统的一部分通过 Docker 或 Kubernetes 部署：

### Docker 部署

```bash
# 使用 Docker Compose 启动
docker-compose -f docker/docker-compose-base.yml up
```

### 静态部署

构建后的前端文件可以部署到任何支持静态网站的服务器：

```bash
npm run build
# 生成的文件位于 dist/ 目录
```

## 配置选项

应用配置通过多个配置文件管理：

- `web/src/conf.json` - 基本应用设置
- `.umirc.ts` - UmiJS 框架配置
- `tailwind.config.js` - Tailwind CSS 配置

在 `.umirc.ts` 中可以配置路由、代理、插件等框架级功能。 