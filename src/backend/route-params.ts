/**
 * Backend 路由参数中心化配置文件
 * 包含后台全部页面的路由路径、参数元数据、解析方法与类型安全跳转辅助函数
 */
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ParamMeta {
  source_table: string;
  source_column: string;
  description: string;
}

function buildUrl(path: string, params: Record<string, string>): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) sp.set(k, v); });
  const query = sp.toString();
  return query ? `${path}?${query}` : path;
}

// ================================================================
// B01 AdminDashboard — 无入参
// ================================================================
export const AdminDashboard = {
  id: 'B01',
  path: '/admindashboard',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminDashboard.path),
};

// ================================================================
// B02 AdminLogin — 无入参
// ================================================================
export const AdminLogin = {
  id: 'B02',
  path: '/adminlogin',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminLogin.path),
};

// ================================================================
// B03 AdminRegister — 无入参
// ================================================================
export const AdminRegister = {
  id: 'B03',
  path: '/adminregister',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminRegister.path),
};

// ================================================================
// B04 AdminStockManagement — 无入参
// ================================================================
export const AdminStockManagement = {
  id: 'B04',
  path: '/adminstockmanagement',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminStockManagement.path),
};

// ================================================================
// B05 AdminContentSupport — 无入参
// ================================================================
export const AdminContentSupport = {
  id: 'B05',
  path: '/admincontentsupport',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(AdminContentSupport.path),
};

// ================================================================
// end
// ================================================================

export const BackendRoutes = {
  AdminDashboard,
  AdminLogin,
  AdminRegister,
  AdminStockManagement,
  AdminContentSupport,
};

export const NAVIGATION_MAP: Record<string, string[]> = {
  B01: [],
  B02: ['B01', 'B03'],
  B03: ['B02'],
  B04: [],
  B05: [],
};

export const PAGE_ID_MAP: Record<string, string> = {
  B01: 'AdminDashboard',
  B02: 'AdminLogin',
  B03: 'AdminRegister',
  B04: 'AdminStockManagement',
  B05: 'AdminContentSupport',
};

/**
 * 传入页面 ID 或名称，从本文件源码中提取：当前页面 + 其所有跳转目标的 export const 代码块。
 * 支持 ID（F10）或名称（PaperCompose / papercompose），大小写不敏感。
 */
export function getRouteContextText(
  pageIdOrName: string,
  fileContent: string
): string {
  let pageId = pageIdOrName
  let currentName = PAGE_ID_MAP[pageId]

  if (!currentName) {
    const lowerInput = pageIdOrName.toLowerCase()
    const entry = Object.entries(PAGE_ID_MAP).find(
      ([, name]) => name.toLowerCase() === lowerInput
    )
    if (entry) {
      pageId = entry[0]
      currentName = entry[1]
    }
  }

  if (!currentName) return `// 错误：未找到页面 ${pageIdOrName}`

  const targetIds = NAVIGATION_MAP[pageId] || []
  const targetNames = targetIds.map((id) => PAGE_ID_MAP[id]).filter(Boolean)

  const lines = fileContent.split('\n')
  const blocks: Record<string, string> = {}
  let currentBlock: string[] = []
  let currentBlockName = ''

  for (const line of lines) {
    if (line.startsWith('// ====')) {
      if (currentBlockName && currentBlock.length > 0) {
        blocks[currentBlockName] = currentBlock.join('\n').trim()
      }
      currentBlock = [line]
      currentBlockName = ''
      continue
    }
    const exportMatch = line.match(/^export const (\w+)\s*=/)
    if (exportMatch && !currentBlockName) {
      currentBlockName = exportMatch[1]
    }
    currentBlock.push(line)
  }
  if (currentBlockName && currentBlock.length > 0) {
    blocks[currentBlockName] = currentBlock.join('\n').trim()
  }

  function getBlock(name: string): string {
    return blocks[name] || `// 未找到 ${name} 的定义`
  }

  const parts: string[] = []
  parts.push('// ★★★ 当前页面 ★★★')
  parts.push(getBlock(currentName))
  if (targetNames.length > 0) {
    parts.push('// ★★★ 跳转目标页面（当前页面会 navigateTo 以下页面）★★★')
    for (const name of targetNames) {
      parts.push(getBlock(name))
    }
  }
  return parts.join('\n\n')
}
