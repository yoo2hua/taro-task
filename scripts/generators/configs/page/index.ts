import * as child from 'child_process'
import { PlopGeneratorConfig } from 'plop'

const pageGeneratorConfig: PlopGeneratorConfig = {
  description: '页面模版',
  prompts: [
    {
      type: 'input', // 问题类型 此处为输入
      name: 'DIR_NAME', // actions 和 hbs 模板文件中可使用该变量
      message: '请输入所在文件夹名称(比如"home")', // 问题
      default: 'DirName', // 问题的默认答案
    },
    {
      type: 'input',
      name: 'FILE_NAME',
      message: '请输入文件名称(比如"index")',
      default: 'INDEX',
    },
    {
      type: 'input',
      name: 'FILE_DESC',
      message: '请输入页面描述',
    },
  ],
  actions(data) {
    const path = `../../../src/pages/`

    let actions: PlopGeneratorConfig['actions'] = [
      {
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.tsx`, // 添加的文件的路径
        templateFile: './page/page.hbs', // 模板文件的路径
      },
      {
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.less`, // 添加的文件的路径
        templateFile: './page/less.hbs', // 模板文件的路径
      },
      {
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.config.ts`, // 添加的文件的路径
        templateFile: './page/config.hbs', // 模板文件的路径
      },
      {
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.route.ts`, // 添加的文件的路径
        templateFile: './page/route.hbs', // 模板文件的路径
      },
      // 在生成文件后执行回调函数
      () => {
        child.exec('npm run route', (error, stdout, stderr) => {
          if (error) {
            console.error(`更新路由失败: ${error}`)
            return
          }
          console.log('更新路由成功~ 💕ღ( ´･ᴗ･` )笔芯')
        })

        return '更新路由中~~'
      },
    ]

    return actions
  },
}

export default pageGeneratorConfig
