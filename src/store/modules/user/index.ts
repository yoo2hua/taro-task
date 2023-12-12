import { login, setStorageSync } from '@tarojs/taro'

import  { setLoginSuccess } from '@/service/request'

import {  LoginWithCode, LoginWithCodeRequest } from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface UserState {
  /** 授权凭据 */
  authorization?: string
  /** 昵称 */
  nick_name?: string
  /** 头像url */
  avatar_url?: string
}

const initialState: UserState = {
  authorization: '',
  nick_name: '',
  avatar_url: '',
}

export const userThunks = {
  login: createAsyncThunk('user/login', async () => {
    try {
      const code = await login().then((r) => {
        return r.code
      })

      let loginParams: LoginWithCodeRequest = {
        login_code: code,
      }

      return await LoginWithCode(loginParams)
    } catch (e) {
      console.error(e)
    }
  }),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunks.login.fulfilled, (state, { payload }) => {
      if (!payload) return
      setStorageSync('Authorization', payload.authorization)
      // ↓这样子没用
      // state = payload;
      Object.keys(payload).forEach((key) => (state[key] = payload[key]))
      setLoginSuccess()
    })
  },
})

export default userSlice.reducer
