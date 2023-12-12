import Taro, { uploadFile } from '@tarojs/taro'

type Options = Taro.uploadFile.Option & {
  callback: (res: Taro.UploadTask.UploadTaskPromise) => void
}
export default async function Uploader(options: Options) {
  return new Promise((resolve, reject) => {
    const uploadTask = uploadFile({
      ...options,
      success: (res) => {
        // res.data是字符串，特殊处理一下
        res.data = JSON.parse(res.data)
        resolve(res)
        options.success?.(res)
      },
      fail: (res) => {
        reject(res)
        options.fail?.(res)
      },
      complete: (res) => {
        resolve(res)
      },
    })
    options?.callback?.(uploadTask)
  })
}
