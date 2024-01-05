import Taro, { getStorageSync } from '@tarojs/taro'

import config from '@/service/config'

import { showToast } from '@/utils/index'

// import $ from '@/utils/$'
import { loginApi } from '@/api/user'

import responseHandler from './response.provider'
import { Callbacks, RequestOptions } from './types'
import Uploader from './upload.provider'

const BASE_URI = config.baseUrl

let loginResolve
let loginPromise: Promise<any> | null = new Promise((resolve) => {
  loginResolve = resolve
})

export function setLoginSuccess() {
  loginResolve()
  loginPromise = null
}

const request = async (api: string, options?: RequestOptions, callback?: Callbacks) => {
  if (!api) {
    return Promise.reject(new Error('未传入url'))
  }
  const opt = options || {}

  const token = getStorageSync('Authorization')

  opt.url = api

  const header = {
    'Content-Type': 'application/json',
    // appid: $.appid,

    ...(token ? { authorization: token } : {}),
  }

  /**
   * 拦截请求，所有请求都放在登录之后执行。
   * 登录时开启一个空的promise => loginPromise，所有的请求都会等待loginPromise resolve。
   * 等到登录成功后，手动resolve这个promise，此时所有请求都会正常执行了。
   */
  // if (loginPromise && api !== loginApi) {
  //   // 此时正在执行登录，所有请求被拦截
  //   await loginPromise
  //   // 登录完成后，重新获取一次token
  //   header.authorization = getStorageSync('Authorization')
  // }

  // 理论上说所有请求逻辑都应该在这行之后处理

  let requester

  if (opt?.file) {
    requester = Uploader({
      ...opt.uploadOptions,
      formData: {
        ...opt.uploadOptions?.formData,
      },
      fail: (err) => {
        console.log('🌊 ~ file: index.ts:80 ~ request ~ err:', err)
        /** errMsg等于uploadFile:fail abort时为手动触发abort */
        if (err.errMsg === 'uploadFile:fail abort') {
          return
        }
        showToast(err.errMsg || '网络异常')
      },
      filePath: opt.file,
      url: BASE_URI + api,
      name: opt.name || 'pic',
      header: {
        ...header,
        'Content-Type': 'multipart/form-data',
      },
    })
  } else {
    const r = Taro.request({
      url: BASE_URI + opt.url,
      data: {
        ...opt.data,
      },
      method: opt.method,
      header,
      timeout: config.requestTimeout,
    })

    callback?.onRequesterBuild?.(r)

    requester = r
  }

  const response = await requester

  const res = await responseHandler(response)

  return res
}

export default request
