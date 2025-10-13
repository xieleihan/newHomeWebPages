// WindowsSystemOptionsStore Redux Store 存储的是Windows系统的一些配置信息

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义State类型
interface WindowsSystemOptionsState {
    userAgentWidth: number; // 用户系统宽度
    userLanguage: string; // 用户浏览器语言
}

// 初始化State
const initialState: WindowsSystemOptionsState = {
    userAgentWidth: 0,
    userLanguage: ''
};

// 创建Slice
const windowsSystemOptionsSlice = createSlice({
    name: 'windowsSystemOptions',
    initialState,
    reducers: {
        setUserAgentWidthStore(state, action: PayloadAction<number>) {
            state.userAgentWidth = action.payload;
        },
        setUserLanguage(state, action: PayloadAction<string>) {
            state.userLanguage = action.payload;
        }
    },
})

// 导出Action
export const { setUserAgentWidthStore,setUserLanguage } = windowsSystemOptionsSlice.actions;

// 导出Reducer
export default windowsSystemOptionsSlice.reducer;