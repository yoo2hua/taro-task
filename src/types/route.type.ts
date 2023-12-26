export interface RouteConfig {
  name: string
  isTabbarPage?: boolean
  /**
   * 模块别名
   */
  aliases: string[] | string
  /**
   * 参数，可选参数请以?结尾，例如'topic?'
   */
  params?: string[]
  /**
   * 分包的root，默认为主包
   */
  root?: string
}
