/** 用户 */
import request from '@/service/request'

import { LoginWithCodeRequest, LoginWithCodeResponse, UserUpdateRequest, UserUpdateResponse } from './type'

const gateway = '/user'

/** 登录 */
export async function LoginWithCode(data: LoginWithCodeRequest): Promise<LoginWithCodeResponse> {
  return await request(loginApi, {
    data,
    method: 'POST',
  })
}

/** 更新 */
export const UserUpdate = async (data: UserUpdateRequest): Promise<UserUpdateResponse> => {
  return await request(`${gateway}/update`, {
    method: 'POST',
    data: data,
  })
}

export const loginApi = `${gateway}/login`
