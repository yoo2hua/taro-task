import { GlobalData } from './type'

/**
 * 全局对象
 */
export const $ = {
  isDev: NODE_ENV === 'development',
  isProd: NODE_ENV === 'production',
} as GlobalData
