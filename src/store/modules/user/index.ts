import { login, setStorageSync } from '@tarojs/taro'

import { setLoginSuccess } from '@/service/request'

import { mapPayloadToState } from '@/utils/index'

import { LoginWithCode, LoginWithCodeRequest } from '@/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  /** 授权凭据 */
  authorization: string
  /** 昵称 */
  nick_name: string
  /** 头像url */
  avatar: string
}

const initialState: UserState = {
  authorization: '',
  nick_name: '初始名称',
  avatar: '1',
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
  reducers: {
    setUserInfo: (state, { payload }: PayloadAction<Partial<UserState>>) => {
      mapPayloadToState(payload, state)
    },
  },
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
