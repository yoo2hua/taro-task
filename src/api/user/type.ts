export interface LoginWithCodeRequest {
  /** 登录code */
  login_code: string
}

export interface LoginWithCodeResponse {
  /** 授权凭据 */
  authorization?: string
  /** 头像 */
  avatar?: string
  /** 昵称 */
  nick_name?: string
}

/** 更新参数 */
export interface UserUpdateRequest {
  /** 头像 */
  avatar?: string
  /** 昵称 */
  user_name?: string
}

/** 更新响应 */
export interface UserUpdateResponse {}
