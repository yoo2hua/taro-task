import Taro from '@tarojs/taro';

export interface RequestOptions {
  data?: any;
  method?: 'GET' | 'POST';
  [key: string]: any;
}

export interface Callbacks {
  /**
   * 请求构造完成时的回调，此时可以通过requester获取request.abort取消请求
   */
  onRequesterBuild?: (requester: Taro.RequestTask<any>) => void;
}

export interface ServiceResponse<T> {
  code: number;
  data: T;
  message?: string;
}
