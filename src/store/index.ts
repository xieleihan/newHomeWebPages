import { configureStore } from '@reduxjs/toolkit'

// 创建store
const store = configureStore({
    reducer:{}
})

// 定义RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;