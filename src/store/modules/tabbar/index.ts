import { IconNames } from '@/components/iconfont'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TabbarState {
  active: string
  list: {
    pagePath: string
    icon: IconNames
    text: string
    dot: boolean
  }[]
}

const initialState: TabbarState = {
  active: 'pages/home/index',
  list: [
    {
      pagePath: 'pages/home/index',
      icon: 'tab-bar-home',
      text: '首页',
      dot: false,
    },
    {
      pagePath: 'pages/task/index',
      icon: 'tab-bar-task',
      text: '任务',
      dot: false,
    },
    {
      pagePath: 'pages/pointMall/index',
      icon: 'tab-bar-store',
      text: '商店',
      dot: false,
    },
    {
      pagePath: 'pages/mine/index',
      icon: 'tab-bar-user',
      text: '我的',
      dot: false,
    },
  ],
}

const tabbarSlice = createSlice({
  name: 'tabbar',
  initialState,
  reducers: {
    updateActivePage(state, { payload }: PayloadAction<string>) {
      if (state.active === payload) return
      console.log('激活tabbar', payload)
      state.active = payload
    },
  },
})

export default tabbarSlice
