// src/workers/imageLoader.worker.ts

interface Task {
    id: number;
    url: string;
    proxyUrl: string;
}

const MAX_CONCURRENT = 3; // 同时最多 3 个请求
const queue: Task[] = [];
let active = 0;
const abortControllers = new Map<number, AbortController>();

// 节流执行器
function processQueue() {
    while (active < MAX_CONCURRENT && queue.length > 0) {
        const task = queue.shift()!;
        active++;
        const controller = new AbortController();
        abortControllers.set(task.id, controller);

        fetch(task.proxyUrl, {
            signal: controller.signal,
        })
            .then(async (res) => {
                if (!res.ok) throw new Error(`Failed: ${res.status}`);
                const blob = await res.blob();
                const blobUrl = URL.createObjectURL(blob);
                postMessage({ type: 'success', id: task.id, url: task.url, blobUrl });
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log(`Request ${task.id} canceled`);
                } else {
                    console.warn(`Fetch failed for ${task.url}:`, error);
                    // 失败时 fallback 到原始 URL
                    postMessage({ type: 'fallback', id: task.id, url: task.url });
                }
            })
            .finally(() => {
                abortControllers.delete(task.id);
                active--;
                processQueue();
            });
    }
}

onmessage = (e) => {
    const { type, id, url, proxyUrl } = e.data;

    if (type === 'add') {
        queue.push({ id, url, proxyUrl });
        processQueue();
    }

    if (type === 'cancel') {
        // 取消指定请求
        if (abortControllers.has(id)) {
            abortControllers.get(id)!.abort();
            abortControllers.delete(id);
        }
    }

    if (type === 'clear') {
        abortControllers.forEach(controller => controller.abort());
        abortControllers.clear();
        queue.length = 0;
    }
};