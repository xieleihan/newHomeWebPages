import { configureStore } from '@reduxjs/toolkit';
// 导入generalStore.ts文件
import generalStore from './generalStore.ts';
// 导入WindowsSystemOptionsStore.ts文件
import WindowsSystemOptionsStore from './Modules/WindowsSystemOptionsStore.ts';

// 创建store
const store = configureStore({
    reducer: {
        general: generalStore,
        windowsSystemOptions: WindowsSystemOptionsStore
    }
})

// 定义RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;