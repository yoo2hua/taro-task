import * as fs from 'fs'

import { OPTIONS, RouteConfigItem } from '.'
import { headerStatement } from './statement'
import { formatFile } from './utils'

/**
 * 生成类型定义
 */
export default function generateRouteType(routeConfigItem: RouteConfigItem[]) {
  // 生成aliases类型
  // 生成aliases和完整路由的映射
  // 生成参数类型
  const aliases: Record<string, string> = {}
  const aliasesToPathMap: Record<string, string> = {}
  const params: Record<string, any> = {}
  routeConfigItem.forEach((item) => {
    // TODO 检查重复别名
    if (Array.isArray(item.aliases)) {
      item.aliases.forEach((alias) => {
        aliases[alias] = alias
        aliasesToPathMap[alias] = '/' + item.page
        params[`[ROUTE.${alias}]`] = parseParams(item)
      })
    } else {
      aliases[item.aliases] = item.aliases
      aliasesToPathMap[item.aliases] = '/' + item.page
      params[`[ROUTE.${item.aliases}]`] = parseParams(item)
    }
  })

  const aliasesToPathMapContent = `
    enum ROUTE_ALIASES_MAP
    ${JSON.stringify(aliasesToPathMap).replaceAll(':', '=')}


    export default ROUTE_ALIASES_MAP
  `

  const aliasesContent = `
     export enum ROUTE
      ${JSON.stringify(aliases).replaceAll(':', '=')}

  `

  const paramsContent = `
    ${aliasesContent}

    export default interface RouterParams extends Record<ROUTE, any>
      ${JSON.stringify(params).replaceAll('"', '')}


  `

  fs.writeFileSync(OPTIONS.files.aliases_to_path, headerStatement + aliasesToPathMapContent)
  formatFile(OPTIONS.files.aliases_to_path)
  fs.writeFileSync(OPTIONS.files.params, headerStatement + paramsContent)
  formatFile(OPTIONS.files.params)
}

/**
 * 解析参数
 */
function parseParams(routeConfigItem: RouteConfigItem) {
  const params: Record<string, string> = {}

  routeConfigItem.params?.forEach((param) => {
    params[param] = 'any'
  })

  return params
}
