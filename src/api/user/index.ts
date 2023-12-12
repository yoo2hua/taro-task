/** 用户 */
import request from '@/service/request'

import { LoginWithCodeRequest, LoginWithCodeResponse } from './type'

const gateway = '/api'

/**
 * 登录
 */
export async function LoginWithCode(data: LoginWithCodeRequest): Promise<LoginWithCodeResponse> {
  return await request(loginApi, {
    data,
    method: 'POST',
  })
}

export const loginApi = `${gateway}/login`
