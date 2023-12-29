/**
 * 将数组按照指定的块大小分割成多个子数组
 * @param array - 要分割的数组
 * @param chunkSize - 块的大小
 * @returns 分割后的子数组
 */
export function splitArrayIntoChunks<T = any>(array: T[], chunkSize: number) {
  const result: T[][] = []

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }

  return result
}

type FormattedNumOptions = {
  showDecimalPoint?: boolean
  decimalPlaces?: number
}

/**
 * 将数字转换为格式化的字符串
 * @param num 要转换的数字
 * @param decimalPlaces 小数位数
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number, decimalPlaces: number = 0): string {
  const formatted = num.toFixed(decimalPlaces)
  return formatted.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * 将payload中的属性映射到state中
 * @param payload - 原始数据对象
 * @param state - 状态对象
 */
export function mapPayloadToState<T extends object>(payload: T, state: T): void {
  Object.keys(payload).forEach((key) => {
    state[key] = payload[key]
  })
}
