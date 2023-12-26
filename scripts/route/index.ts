import * as path from 'path'

import { RouteConfig } from '../../src/types/route.type'
import writeAppConfigPages from './page.generator'
import generateRouteType from './type.generator'
import { getAllRouteConfigFiles, resolveRouteConfigContent } from './utils'

export interface RouteConfigItem extends RouteConfig {
  page: string
}

export const OPTIONS = {
  /**
   * 需要写入的文件路径，绝对路径
   */
  files: {
    app: path.join(__dirname, '../../src/app.config.ts'),
    aliases_to_path: path.join(__dirname, '../../src/routes/aliases_to_path.type.ts'),
    path_to_aliases: path.join(__dirname, '../../src/routes/path_to_aliases.type.ts'),
    params: path.join(__dirname, '../../src/routes/params.type.ts'),
    config: path.join(__dirname, '../../src/routes.ts'),
  },
}
generate()

async function generate() {
  const configFiles = getAllRouteConfigFiles()
  const config: RouteConfigItem[] = await Promise.all(configFiles.map((file) => resolveRouteConfigContent(file)))
  writeAppConfigPages(config)
  generateRouteType(config)
}
