import { NodePlopAPI } from 'plop'

import componentGeneratorConfig from './component'
import pageGeneratorConfig from './page'

export default (plop: NodePlopAPI) => {
  // 欢迎语
  plop.setWelcomeMessage('欢迎使用~ 请选择需要创建的模版：')
  plop.setGenerator('page', pageGeneratorConfig)
  plop.setGenerator('component', componentGeneratorConfig)
}
