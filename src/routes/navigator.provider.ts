import { navigateTo, reLaunch, switchTab } from '@tarojs/taro'

import { queryString } from '@/utils/qs'

import ROUTE_ALIASES_MAP from '@/routes/aliases_to_path.type'

import RouterParams from './params.type'

export const historyRouter: string[] = []

export async function navi<T extends keyof RouterParams>(route: T, params?: RouterParams[T], shouldRelaunch?: boolean) {
  // 未传入route跳转到首页
  if (!route) {
    relaunchToIndex()
    return
  }

  let page = ROUTE_ALIASES_MAP[route]

  if (!page) {
    console.error('获取路由配置失败 ', page)
    return
  }

  const url = `${page}${queryString(params)}`

  console.log('跳转路由', page)
  params && console.table(params)

  if (shouldRelaunch) {
    reLaunch({ url })
    return
  }

  navigateTo({
    url,
    fail: () => {
      switchTab({
        url: page,
      })
    },
  })
}

/**
 * 重启到首页
 */
export function relaunchToIndex() {
  reLaunch({
    url: ROUTE_ALIASES_MAP.home,
  })
}
