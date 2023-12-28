/* eslint @typescript-eslint/no-require-imports: 0 */
const child = require('child_process')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

/**
 * 获取src/pages中的所有index.route.ts文件
 */
export function getAllRouteConfigFiles() {
  return glob.sync(path.join(__dirname, '../../src/pages/**/index.route.ts'))
}

/**
 * 读取route.config.ts中的内容
 */
export const resolveRouteConfigContent = async (routeConfigPath: string) => {
  const { default: config } = require(routeConfigPath)
  config.page = resolvePagePath(routeConfigPath)
  return config
}

/**
 * 根据index.route.ts的路径生成页面路径
 */
function resolvePagePath(configPath: string) {
  // 取出src/后面的路径 & 替换文件为页面文件
  return configPath.split('src/')[1].replace('index.route.ts', 'index')
}

/**
 * 格式化文件
 */
export function formatFile(path: string) {
  // 可能存在windows兼容问题
  child.exec(`prettier --write ${path}`)
}

/**
 * 根据传入的内容写文件
 * @filePath 文件路径
 * @content 需要写入的内容
 * @options.startLine 开始行
 * @options.endLine 结束行
 * @options.startLineContent 开始行内容，与startLine任选一个即可
 * @options.endLineContent 结束行内容，与endLine任选一个即可
 * @see https://github.com/lexmin0412/tarox/blob/master/packages/plugin-internal/src/utils/writeFile.ts
 */
export const writeFileByBoundary = (
  filePath,
  content,
  options: {
    startLine?: number
    endLine?: number
    startLineContent?: string
    endLineContent?: string
  },
) => {
  const fileBuffer = fs.readFileSync(filePath).toString().split('\n')

  const { startLine, endLine, startLineContent, endLineContent } = options

  let start = 0
  let end = fileBuffer.length
  // 优先级 startLine > startLineContent
  if (startLine) {
    start = startLine
  } else if (startLineContent) {
    start = fileBuffer.findIndex((item) => item.indexOf(startLineContent) > -1) + 1
  }
  // 优先级 endLine > endLineContent
  if (endLine) {
    end = endLine
  } else if (endLineContent) {
    end = fileBuffer.findIndex((item) => item.indexOf(endLineContent) > -1)
  }

  // 清除掉开始和结束行之间的原有
  const cutLines = start === end ? 0 : end - 1 - start
  if (start === end) {
    fileBuffer.splice(start, cutLines, content)
  } else {
    fileBuffer.splice(start, cutLines)
    // 拼接新内容
    fileBuffer[start] = content
  }

  // 拼接新内容
  fileBuffer[start] = content

  const templateStr = `${fileBuffer.join('\n')}`
  fs.writeFileSync(filePath, templateStr)
}
