const { parentPort, workerData } = require("worker_threads");

async function work() {
    const { workingTime } = workerData
    const time = Number(workingTime)
    let doSomething = 0
    const end = Date.now() + time;
    while (Date.now() < end) {
        doSomething += 1
    }
    parentPort.postMessage(time)
}
work()