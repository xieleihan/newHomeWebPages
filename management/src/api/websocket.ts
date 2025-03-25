type WebSocketMessageListener = (message: string) => void;
type WebSocketErrorListener = (error: Event) => void;
type WebSocketOpenListener = () => void;
type WebSocketCloseListener = () => void;

interface WebSocketOptions {
    onMessage?: WebSocketMessageListener; // 消息监听器
    onError?: WebSocketErrorListener; // 错误监听器
    onOpen?: WebSocketOpenListener; // 连接成功监听器
    onClose?: WebSocketCloseListener; // 连接关闭监听器
    maxReconnectAttempts?: number; // 最大重连次数
    reconnectInterval?: number; // 重连间隔时间（毫秒）
}

// 导入host_url
const host_url = import.meta.env.VITE_WS_BASE_API;

export const useWebSocket = (url: string, options: WebSocketOptions = {}) => {
    const {
        onMessage,
        onError,
        onOpen,
        onClose,
        maxReconnectAttempts = 5,
        reconnectInterval = 3000,
    } = options;

    let socket: WebSocket | null = null;
    let reconnectAttempts = 0;
    let isConnected = false;

    // 创建 WebSocket 连接
    const connect = () => {
        socket = new WebSocket(`${host_url}${url}`);

        // 连接成功
        socket.onopen = () => {
            isConnected = true;
            reconnectAttempts = 0; // 重置重连次数
            console.log('WebSocket 连接成功');
            if (onOpen) onOpen();
        };

        // 接收消息
        socket.onmessage = (event: MessageEvent) => {
            const message = event.data;
            // console.log('收到消息:', message);
            if (onMessage) onMessage(message);
            // 返回一个Promise
            return new Promise((resolve) => {
                resolve(message);
            });
        };

        // 连接关闭
        socket.onclose = () => {
            isConnected = false;
            console.log('WebSocket 连接关闭');
            if (onClose) onClose();
            handleReconnect(); // 尝试重连
        };

        // 连接错误
        socket.onerror = (error: Event) => {
            console.error('WebSocket 错误:', error);
            if (onError) onError(error);
        };
    };

    // 处理重连
    const handleReconnect = () => {
        if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.log(`尝试重连，第 ${reconnectAttempts} 次`);
            setTimeout(() => connect(), reconnectInterval);
        } else {
            console.error('已达到最大重连次数，放弃重连');
        }
    };

    // 发送消息
    const send = (message: string) => {
        if (isConnected && socket) {
            socket.send(message);
        } else {
            console.error('WebSocket 未连接，无法发送消息');
        }
    };

    // 关闭连接
    const close = () => {
        if (socket) {
            socket.close();
        }
    };

    // 初始化连接
    connect();

    return {
        send,
        close,
        isConnected: () => isConnected,
    };
};