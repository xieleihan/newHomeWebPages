const max_count = 3;
let activateRequest = 0;
const taskQueue: (() => Promise<void>)[] = [];

function scheduleTask(fn: () => Promise<void>) {
    taskQueue.push(fn);
    processQueue();
}

function processQueue() {
    if (activateRequest >= max_count || taskQueue.length === 0) {
        return;
    }

    const task = taskQueue.shift();
    if (task) {
        activateRequest++;
        task().finally(() => {
            activateRequest--;
            processQueue();
        });
    }
}

export { scheduleTask, processQueue };
