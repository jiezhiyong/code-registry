# Storybook MCP 与 Skill 使用指南

本文面向**组件库维护者**与**业务项目使用方**，介绍如何让 AI Agent 读取 Storybook 组件文档与清单。

## 快速开始

- **业务项目**：使用本仓库提供的 **Skills** 直接读取远端组件库 manifests（推荐）
- **组件库开发**：使用 `@storybook/addon-mcp` 提效工作流，同时用 Skills 测试功能
- **部署场景**：使用 `@storybook/mcp` 部署独立的 MCP Server（可选）

---

## 业务项目：使用 Skills 读取组件库文档（推荐）

如果你的业务项目需要让 AI Agent 读取组件库文档，**优先使用本仓库提供的 Skills**，无需部署 MCP Server。

### 本仓库已实现的 Claude Skills

本仓库已内置两个项目级 Skills（位于 `.claude/skills/`），可直接复制到业务项目使用：

- **`storybook-list-documentation`**：列出全部文档条目（等价于 `list-all-documentation`）
  - 文件：`.claude/skills/storybook-list-documentation/SKILL.md`
- **`storybook-get-documentation`**：获取指定条目详情（等价于 `get-documentation`）
  - 文件：`.claude/skills/storybook-get-documentation/SKILL.md`

### 配置方式

**配置优先级**（从高到低）：

1. **命令行参数** `--manifestsRoot`（临时覆盖）
2. **环境变量** `STORYBOOK_MANIFESTS_ROOT`（推荐用于业务项目配置远端 manifests）
3. **默认值** `./storybook-static/manifests`（本地开发默认路径）

**业务项目配置示例**：

```bash
# 设置环境变量（一次配置，长期使用）
export STORYBOOK_MANIFESTS_ROOT=https://storybook.your-company.com/manifests
```

配置后，Skills 会自动使用该路径，无需每次传入 `--manifestsRoot`。

### 使用示例

**列出全部文档**：

```bash
# 业务项目（已配置环境变量）
node tools/storybook-manifest-skill.mjs list

# 临时指定路径
node tools/storybook-manifest-skill.mjs list \
  --manifestsRoot https://storybook.your-company.com/manifests
```

**获取指定条目文档**：

```bash
# 业务项目（已配置环境变量）
node tools/storybook-manifest-skill.mjs get --id component-button

# 临时指定路径
node tools/storybook-manifest-skill.mjs get \
  --id component-button \
  --manifestsRoot https://storybook.your-company.com/manifests
```

### 脚本说明

本仓库提供了可直接使用的脚本：`tools/storybook-manifest-skill.mjs`，支持：

- **本地读取**：`./storybook-static/manifests/components.json`（默认）
- **远程读取**：`https://.../manifests/components.json`
- **可配置的 manifests 路径**：通过环境变量 `STORYBOOK_MANIFESTS_ROOT` 配置
- **（可选）请求参数**：`--headersJson` 可用于远程鉴权请求头；`--allowHosts` 可用于域名限制

> **安全提示**：本项目的 Claude Skills **默认不启用安全策略**（allowlist/鉴权/限流等），如要在团队/企业环境使用，建议在外层（网关/运行环境）补齐治理。

---

## 组件库开发：使用 @storybook/addon-mcp 提效工作流

在组件库仓库中，使用 `@storybook/addon-mcp` 可以大幅提升开发效率，同时也可以使用 Skills 来测试功能。

### 它是什么？

`@storybook/addon-mcp` 是一个 Storybook 插件，用于在**开发期**把 MCP Server 直接挂到正在运行的 Storybook dev server 上。

- MCP 端点：`<your_storybook_dev_server_origin>/mcp`（例如 `http://localhost:6006/mcp`）
- 适合：组件开发、编写 stories、视觉验证、联调与回归

### 核心能力（工具列表）

该插件会向 MCP Client 暴露工具（tools）：

- **Dev Tools（默认可用）**
  - `get_ui_building_instructions`：返回"如何在本项目里写 UI / 写 stories"的约束与最佳实践（例如 CSF3、命名约定、组织结构等）
  - `get_story_urls`：根据 story 文件路径与导出名等信息，返回对应 story 的可直达 URL（便于快速视觉验证）
- **Docs Tools（实验性，需要额外开关）**
  - `list-all-documentation`：列出所有文档条目（组件文档、独立 docs 等），用于"发现/盘点/覆盖率分析"
  - `get-documentation`：读取某个文档条目的详细内容（用于写文档、写测试、减少"猜 props/猜用法"）

> **注意**：Docs Tools 依赖"组件/文档 manifests（组件清单）"的生成能力；这通常需要启用特性开关与满足版本/框架限制。

### 安装与配置

**安装**：

```bash
npx storybook add @storybook/addon-mcp
```

**配置**（`.storybook/main.js`）：

```javascript
export default {
  addons: [
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true, // 默认 true
          docs: true, // 默认 true，但需要额外启用 experimental manifest 能力
        },
        experimentalFormat: 'markdown', // 输出格式：'markdown'（默认）或 'xml'
      },
    },
  ],
  features: {
    experimentalComponentsManifest: true, // 启用 manifests 生成
  },
};
```

**启动**：

```bash
npm run storybook
```

启动后 MCP Server 位于：`http://localhost:6006/mcp`

### 典型提效场景

- **组件开发 + 自动产出 stories**
  - 先调用 `get_ui_building_instructions` 获取团队规范
  - agent 按规范生成/补齐 CSF3 stories（含关键状态）
  - 再用 `get_story_urls` 直达链接快速目测与回归
- **文档与测试一体化**
  - docs toolset 可让 agent 读取组件文档与清单，减少"凭空猜测 props/示例"
  - 常用于：补齐文档缺口、生成组件测试用例、生成回归清单
- **覆盖率/盘点**
  - `list-all-documentation` 适合做"组件库条目是否齐全"的盘点（哪些组件没文档、哪些 docs 过期）

### 同时使用 Skills 测试功能

在组件库开发中，你也可以使用本仓库的 Skills 来测试功能：

1. **构建 Storybook**：`npm run build-storybook`（生成 `storybook-static/manifests`）
2. **使用 Skills 测试**：直接使用 `storybook-list-documentation` 和 `storybook-get-documentation` Skills，它们会默认读取本地 `./storybook-static/manifests`

这样可以验证 Skills 是否正常工作，同时也可以对比 MCP Server 和 Skills 的输出是否一致。

---

## 部署场景：使用 @storybook/mcp（可选）

如果你的场景需要部署一个独立的 MCP Server（例如多租户、统一网关等），可以使用 `@storybook/mcp`。

### 它是什么？

`@storybook/mcp` 是一个**独立的 MCP Server 能力实现**，用于"把 Storybook 组件知识（文档/组件清单）"以 MCP tools 的形式暴露给各种 MCP Client（Cursor、Copilot、Claude Code 等）。

### 适用场景

- 需要统一管理多个组件库的 MCP 服务
- 需要做安全治理（allowlist、鉴权、缓存、限流等）
- 需要长期运行的服务端能力

### 安全与工程化治理（强烈建议）

如果部署 `@storybook/mcp`，请至少考虑以下治理项：

- **Allowlist（强烈建议）**：只允许访问认可的域名/路径
- **鉴权**：OIDC/OAuth、网关 JWT、mTLS、或内部 Token
- **缓存**：manifests 通常可缓存（按版本/构建 hash）
- **限流**：防止 agent 或误配置导致的高频拉取
- **审计与可观测性**：记录 tool 调用、请求来源、响应耗时、失败原因

> **重要提示**：不要做"公网随意传 URL 的通用代理式 MCP"（风险极高），而是做"受控 allowlist + 鉴权 + 缓存 + 限流"的内部服务。

### 为什么官方不提供公共 MCP 服务？

Storybook 提供通用实现包，但**没有官方托管的公共服务**。常见原因包括：

- **SSRF / 内网探测风险**：公共服务允许传任意 URL，几乎必然被滥用
- **隐私与合规**：组件库通常包含未发布组件、设计细节、内部规范
- **成本与治理**：拉取/解析/缓存/限流/审计都需要持续运营

因此更合理的模式是：**你们团队/公司自建一个 MCP Server**，并把访问控制做到位。

---

## 重要提示

- **Docs Tools 是实验性能力**：需要满足 Storybook 版本、框架类型，并开启 `experimentalComponentsManifest` 等开关。若没产出 manifests，则 docs tools 无法工作。
- **toolsets 可以用来"模拟外部消费者体验"**：例如只开放 `docs` toolset，让外部使用方/业务方只能"读文档"，不能使用开发期工具。
- **不要把 MCP Server 当成公共代理**：任何"用户可输入任意 URL"的设计都必须做严格校验与隔离（否则极容易出安全事故）。

---

## 参考

- `@storybook/addon-mcp` 文档：`https://storybook.js.org/addons/@storybook/addon-mcp`
- `storybookjs/mcp` 仓库：`https://github.com/storybookjs/mcp`
