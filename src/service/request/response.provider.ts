import Taro, { setStorageSync, showToast } from '@tarojs/taro';

import { ServiceResponse } from './types';

export default function responseHandler<T extends ServiceResponse<T>>(
  response: Taro.request.SuccessCallbackResult<T>,
): Promise<any> {
  const status = response.statusCode;
  const data = typeof response.data === 'object' ? { ...response.data } : response.data;

  // 存储token
  const token =
    response.header['Set-authorization'] ||
    response.header['set-authorization'] ||
    response.header['Set-Authorization'];
  token && setStorageSync('Authorization', token);

  // 请求成功，直接返回data
  if (status === 200 && data.code === 0) {
    return Promise.resolve(data.data);
  }

  if (data.code !== 0) {
    showToast({
      title: data.message || '网络异常，请稍后再试',
      icon: 'none',
      duration: 2000,
    });
    return Promise.reject(data);
  }

  console.error('服务器异常', data);

  return Promise.reject(data);
}
