import { OPTIONS, RouteConfigItem } from '.'
import { chunkStatement } from './statement.generator'
import { formatFile, writeFileByBoundary } from './utils'

/**
 * 将路由写入到app.config.ts中
 */
export default function writeAppConfigPages(routeConfigItem: RouteConfigItem[]) {
  // 主包
  const pages: string[] = []
  // 分包
  const subpackages: Record<string, string[]> = {}
  // tabbar页面
  const tabbar: { pagePath: string; text: string }[] = []

  routeConfigItem.forEach((item) => {
    if (!item.root) {
      // 首页特殊处理一下
      if (item.name === '首页') {
        pages.unshift(item.page)
      } else {
        pages.push(item.page)
      }
    } else {
      if (!subpackages[item.root]) subpackages[item.root] = []
      console.log(item)

      subpackages[item.root].push(item.page.split(item.root + '/')[1])
    }

    if (item.isTabbarPage) {
      tabbar.push({
        pagePath: item.page,
        text: item.name,
      })
    }
  })

  const subs = Object.keys(subpackages).map((root) => ({ root, pages: subpackages[root] }))

  console.log('pages')
  console.log(pages)
  console.log('subpackages')
  console.log(subs)
  console.log('tabbar')
  console.log(tabbar)

  writeFileByBoundary(
    OPTIONS.files.app,
    chunkStatement +
      `
    pages:${JSON.stringify(pages)},
    subpackages:${JSON.stringify(subs)},
  `,
    {
      startLineContent: '/** PAGE_START */',
      endLineContent: '/** PAGE_END */',
    },
  )

  writeFileByBoundary(
    OPTIONS.files.app,

    chunkStatement +
      `list:${JSON.stringify(tabbar)}
  `,
    {
      startLineContent: '/** TABBAR_START */',
      endLineContent: '/** TABBAR_END */',
    },
  )

  formatFile(OPTIONS.files.app)
}
