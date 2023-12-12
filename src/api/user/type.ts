export interface LoginWithCodeRequest {
  /** 登录code */
  login_code: string;
}

export interface LoginWithCodeResponse {
  /** 授权凭据 */
  authorization?: string
  /** 头像 */
  avatar_url?: string
  /** 昵称 */
  nick_name?: string
}
