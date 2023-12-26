export interface RouteConfig {
  name: string
  isTabbarPage?: boolean
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
