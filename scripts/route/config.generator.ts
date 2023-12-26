import { RouteConfigItem } from './index'

/**
 * TODO 汇总完整的路由配置
 */
export default function generateConfig(routeConfigItem: RouteConfigItem[]) {
  const res: Record<string, RouteConfigItem> = {}
  routeConfigItem.forEach((item) => {
    delete item.root
    if (Array.isArray(item.aliases)) {
      item.aliases.forEach((alias) => {
        res[alias] = {
          ...item,
        }
      })
    }
  })
}
