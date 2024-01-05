import dayjs from 'dayjs'

/**
 * 获取当前时间的时段
 * @returns {string} 时段字符串，可能的取值为：上午、中午、下午、傍晚、晚上、深夜
 */
export function getPeriodOfDay(): string {
  const currentHour = dayjs().hour()

  if (currentHour >= 5 && currentHour < 9) {
    return '上午'
  } else if (currentHour >= 9 && currentHour < 12) {
    return '中午'
  } else if (currentHour >= 12 && currentHour < 18) {
    return '下午'
  } else if (currentHour >= 18 && currentHour < 20) {
    return '傍晚'
  } else if (currentHour >= 20 && currentHour < 24) {
    return '晚上'
  } else {
    return '深夜'
  }
}

