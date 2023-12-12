import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const tabbarSlice = createSlice({
  name: 'tabbar',
  initialState: {
    active: 'pages/home/index',
    list: [
      {
        pagePath: 'pages/home/index',
        icon: 'home-o',
        text: '首页',
        dot: false,
      },
      {
        pagePath: 'pages/mine/index',
        icon: 'user-circle-o',
        text: '我的',
        dot: false,
      },
    ],
  },
  reducers: {
    updateActivePage(state, { payload }: PayloadAction<string>) {
      if (state.active === payload) return
      console.log('激活tabbar', payload)
      state.active = payload
    },
  },
})

export default tabbarSlice
