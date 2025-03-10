const PUBLIC_VAPID_KEY = "BGEsulQVsbqGYwjySb_i62PxF4-53VIJyeKfGi1b0-tHKysAbQgneTU6m1hu_QZbqpMacxkxiS4pGxrpsip8vR4"; // 这里替换为后端生成的公钥

import { sendSubscription } from "../api/request";

async function subscribeUser() {
    if (!("serviceWorker" in navigator)) {
        console.error("当前浏览器不支持 Service Worker");
        return;
    }

    try {
        // 注册 Service Worker
        const register = await navigator.serviceWorker.register("/sw.js", { scope: "/" });

        // 请求用户授权
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("用户拒绝通知权限");
            return;
        }

        // 订阅推送通知
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
        });

        // 发送订阅信息到后端
        const res = await sendSubscription(subscription);
        console.log("订阅成功:", res);
        
    } catch (error) {
        console.error("订阅失败:", error);
    }
}

// 将 Base64 公钥转换为 Uint8Array
function urlBase64ToUint8Array(base64String:any) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export default subscribeUser;