# Registry-Template

You can use the `shadcn` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any React project.

> [!IMPORTANT]
> This template uses Tailwind v4.

## Getting Started

This is a template for creating a custom registry using Next.js.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item are compatible with the `shadcn` CLI.
- We have also added v0 integration using the `Open in v0` api.

## Usage

```sh
pnpm dlx shadcn@latest search @tcsk
pnpm dlx shadcn@latest add @tcsk/button
```

## Usage local

```sh
pnpm dlx shadcn@latest search @tcsk-local
pnpm dlx shadcn@latest add @tcsk-local/button
```

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.

## Heroui + Shadcn registry

2. 手动创建 components.json、配置 tsconfig.json compilerOptions.paths
3. 运行 npx shadcn@latest add @tcsk/core 复制核心文件（provider、utils、types、hooks、css、安装@react-aria、@react-types 等若干依赖包）
4. 运行 npx shadcn@latest add @tcsk/\* 复制组件文件（utils、types、hooks、关联组件等，至少 5 个文件）
5. 兼容 rem ?
6. 升级 React 19, 废弃 forwardRef ?
