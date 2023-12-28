import { PlopGeneratorConfig } from 'plop'

const componentGeneratorConfig: PlopGeneratorConfig = {
  description: '组件模版',
  prompts: [
    {
      type: 'input', // 问题类型 此处为输入
      name: 'DIR_NAME', // actions 和 hbs 模板文件中可使用该变量
      message: '请输入所在文件夹名称(比如"avatar")', // 问题
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
    {
      type: 'confirm',
      name: 'IS_FORWARD_REF',
      message: '是否使用forwardRef',
      default: true,
    },
  ],
  actions(data) {
    const path = `../../../src/components/`
    const actions: PlopGeneratorConfig['actions'] = [
      {
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.module.less`, // 添加的文件的路径
        templateFile: './component/less.hbs', // 模板文件的路径
      },
    ]

    if (data?.IS_FORWARD_REF) {
      actions.push({
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.tsx`, // 添加的文件的路径
        templateFile: './component/forward.hbs', // 模板文件的路径
      })
    } else {
      actions.push({
        type: 'add',
        path: `${path}{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}.tsx`, // 添加的文件的路径
        templateFile: './component/page.hbs', // 模板文件的路径
      })
    }

    return actions
  },
}

export default componentGeneratorConfig
