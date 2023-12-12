import { configureStore } from '@reduxjs/toolkit'

import tabbarSlice from './modules/tabbar'
import userSlice from './modules/user'

const store = configureStore({
  reducer: {
    tabbar: tabbarSlice.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const dispatch = store.dispatch

// 全局定义 dispatch和state的类型,并导出
// 后面使用过程中直接从该文件中引入,而不需要冲react-redux包中引入
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
