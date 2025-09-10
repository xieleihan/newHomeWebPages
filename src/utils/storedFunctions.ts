/**
 * 获取 Windows sessionStorage 的值
 * @param key 存储的键
 * @returns string | null 存储的值
 */
function getWindowsSessionStorage(key: string): string | null { 
    return window.sessionStorage.getItem(key);
}

/**
 * 设置 Windows sessionStorage 的值
 * @param key 存储的键
 * @param value 存储的值
 * @returns void
 */
function setWindowsSessionStorage(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
}

/**
 * 删除 Windows sessionStorage 的值
 * @param key 存储的键
 * @returns void
 */
function removeWindowsSessionStorage(key: string): void {
    window.sessionStorage.removeItem(key);
}

/**
 * 获取 Windows localStorage 的值
 * @param key 存储的键
 * @returns string | null 存储的值
 */
function getWindowsLocalStorage(key: string): string | null {
    return window.localStorage.getItem(key);
}

/**
 * 设置 Windows localStorage 的值
 * @param key 存储的键
 * @param value 存储的值
 * @returns void
 */
function setWindowsLocalStorage(key: string, value: string): void {
    window.localStorage.setItem(key, value);
}

/**
 * 删除 Windows localStorage 的值
 * @param key 存储的键
 * @returns void
 */
function removeWindowsLocalStorage(key: string): void {
    window.localStorage.removeItem(key);
}

export {
    getWindowsSessionStorage,
    setWindowsSessionStorage,
    removeWindowsSessionStorage,
    getWindowsLocalStorage,
    setWindowsLocalStorage,
    removeWindowsLocalStorage
}