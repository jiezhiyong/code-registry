/**
 * Storybook manifests 读取脚本（可用于"Skill/自定义工具"）
 *
 * 目标：不运行 MCP Server，也能在本地/CI/IDE 里直接读取
 * `storybook-static/manifests/components.json`（或远程 https://.../manifests/components.json）
 * 并提供类似 @storybook/mcp 的核心能力：
 * - list-all-documentation  => `list`
 * - get-documentation       => `get --id <id>`
 *
 * 配置优先级（从高到低）：
 * 1. 命令行参数 --manifestsRoot（临时覆盖）
 * 2. 环境变量 STORYBOOK_MANIFESTS_ROOT（推荐用于业务项目配置远端 manifests）
 * 3. 默认值 ./storybook-static/manifests（本地开发默认路径）
 *
 * 用法示例：
 *   # 本地开发（使用默认路径）
 *   node tools/storybook-manifest-skill.mjs list
 *   node tools/storybook-manifest-skill.mjs get --id component-button
 *
 *   # 业务项目（通过环境变量配置远端 manifests）
 *   export STORYBOOK_MANIFESTS_ROOT=https://storybook.your-company.com/manifests
 *   node tools/storybook-manifest-skill.mjs list
 *   node tools/storybook-manifest-skill.mjs get --id component-button
 *
 *   # 临时指定路径
 *   node tools/storybook-manifest-skill.mjs list --manifestsRoot ./storybook-static/manifests
 *   node tools/storybook-manifest-skill.mjs list --manifestsRoot https://example.com/storybook/manifests
 *
 * 安全建议：
 * - 若 manifestsRoot 允许来自用户输入，请启用 --allowHosts 做域名白名单限制
 * - 远程读取若有鉴权，可用 --headersJson 传入请求头（例如 Authorization）
 */

import { parseArgs } from 'node:util';
import * as fs from 'node:fs/promises';
import { basename } from 'node:path';

function normalizeRoot(root) {
  return root.replace(/\/+$/, '');
}

function parseAllowHosts(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function assertAllowedHost(root, allowHosts) {
  if (!allowHosts?.length) return;
  if (!root.startsWith('http://') && !root.startsWith('https://')) return;
  const host = new URL(root).host;
  if (!allowHosts.includes(host)) {
    throw new Error(
      `manifestsRoot host 不在 allowlist 中：${host}\n允许的 hosts：${allowHosts.join(', ')}`,
    );
  }
}

async function readText({ manifestsRoot, filename, headers }) {
  const root = normalizeRoot(manifestsRoot);
  if (root.startsWith('http://') || root.startsWith('https://')) {
    const url = `${root}/${basename(filename)}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`拉取远程 manifests 失败：${res.status} ${res.statusText} (${url})`);
    }
    return await res.text();
  }
  // 本地目录
  return await fs.readFile(`${root}/${basename(filename)}`, 'utf-8');
}

function toMarkdownList(components) {
  const lines = [];
  lines.push(`# Documentation Index`);
  lines.push('');
  lines.push(`共 ${components.length} 条`);
  lines.push('');
  for (const c of components) {
    lines.push(`- **${c.name}** (\`${c.id}\`)`);
    if (c.path) lines.push(`  - path: \`${c.path}\``);
    if (c.description) lines.push(`  - description: ${c.description}`);
    if (Array.isArray(c.stories) && c.stories.length) {
      lines.push(`  - stories: ${c.stories.map((s) => s?.name).filter(Boolean).join(', ')}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function toMarkdownDoc(entry) {
  const lines = [];
  lines.push(`# ${entry.name} (\`${entry.id}\`)`);
  lines.push('');
  if (entry.description) {
    lines.push(entry.description);
    lines.push('');
  }
  if (entry.path) lines.push(`- **story file**: \`${entry.path}\``);
  if (entry.import) {
    lines.push('');
    lines.push('## Import');
    lines.push('');
    lines.push('```');
    lines.push(String(entry.import).trimEnd());
    lines.push('```');
    lines.push('');
  }
  if (Array.isArray(entry.stories) && entry.stories.length) {
    lines.push('## Stories');
    lines.push('');
    for (const s of entry.stories) {
      lines.push(`### ${s.name}`);
      if (s.snippet) {
        lines.push('');
        lines.push('```tsx');
        lines.push(String(s.snippet).trimEnd());
        lines.push('```');
      }
      lines.push('');
    }
  }
  if (entry.reactDocgen?.props) {
    lines.push('## Props (react-docgen)');
    lines.push('');
    for (const [propName, prop] of Object.entries(entry.reactDocgen.props)) {
      lines.push(`- **${propName}**: ${prop?.tsType?.name ?? ''}`.trim());
      if (prop?.description) lines.push(`  - ${prop.description}`);
      if (prop?.defaultValue?.value != null) {
        lines.push(`  - default: \`${String(prop.defaultValue.value)}\``);
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

async function loadComponentsJson({ manifestsRoot, allowHosts, headers }) {
  assertAllowedHost(manifestsRoot, allowHosts);
  const text = await readText({ manifestsRoot, filename: 'components.json', headers });
  const json = JSON.parse(text);
  const dict = json?.components ?? {};
  return { raw: json, componentsDict: dict };
}

async function main() {
  // 支持从环境变量读取默认 manifestsRoot，优先级：命令行参数 > 环境变量 > 默认值
  const defaultManifestsRoot =
    process.env.STORYBOOK_MANIFESTS_ROOT || './storybook-static/manifests';

  const args = parseArgs({
    allowPositionals: true,
    options: {
      manifestsRoot: { type: 'string', default: defaultManifestsRoot },
      format: { type: 'string', default: 'markdown' }, // 'markdown' | 'json'
      id: { type: 'string' },
      allowHosts: { type: 'string' }, // 逗号分隔：a.com,b.com
      headersJson: { type: 'string' }, // JSON 字符串：{"Authorization":"Bearer ..."}
    },
  });

  const cmd = args.positionals[0];
  if (!cmd || (cmd !== 'list' && cmd !== 'get')) {
    throw new Error(
      `用法：node tools/storybook-manifest-skill.mjs <list|get> [--id <id>] [--manifestsRoot <path|url>]`,
    );
  }

  const manifestsRoot = args.values.manifestsRoot;
  const allowHosts = parseAllowHosts(args.values.allowHosts);
  const headers =
    args.values.headersJson && args.values.headersJson.trim()
      ? JSON.parse(args.values.headersJson)
      : undefined;

  const { componentsDict } = await loadComponentsJson({ manifestsRoot, allowHosts, headers });
  const list = Object.values(componentsDict);

  if (cmd === 'list') {
    if (args.values.format === 'json') {
      process.stdout.write(JSON.stringify(list, null, 2));
      return;
    }
    process.stdout.write(toMarkdownList(list));
    return;
  }

  // get
  const id = args.values.id;
  if (!id) throw new Error(`get 需要 --id 参数，例如：get --id component-button`);
  const entry = componentsDict[id];
  if (!entry) throw new Error(`未找到 id=${id} 的文档条目`);

  if (args.values.format === 'json') {
    process.stdout.write(JSON.stringify(entry, null, 2));
    return;
  }
  process.stdout.write(toMarkdownDoc(entry));
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exitCode = 1;
});

