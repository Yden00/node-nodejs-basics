import os from 'os';
import { Worker } from 'worker_threads';

const performCalculations = async () => {
    const cpuCount = os.cpus().length;
    const workerArr = [];
    let count = 10;
    let workerId = count
    for (let i = 0; i < cpuCount; i++) {
        const workerPromise = new Promise((resolve, reject) => {
            let worker = createWorker(count);
            worker.on('message', (data) => {
                resolve({
                    status: 'resolved',
                    data: data,
                    workerId : workerId
                })
            });
            worker.on('error', (error) => {
                console.error(`Worker ${count} error:`, error);
                reject({
                    status: 'error',
                    data: null,
                    workerId: workerId
                });
            });
            worker.on('exit', (code) => {
                if(code !== 0) {
                    const exitError = new Error(`Worker ${count} stopped with exit code ${code}`);
                    console.error(exitError);
                    reject({
                        status: 'error',
                        data: null,
                        workerId: workerId
                    });
                }
            })
        })
        workerArr.push(workerPromise);
        count++;
    }
    try {
        return await Promise.all(workerArr);
    } catch (error) {
        console.error('An error occured while performing calculations', error);
        throw error;
    }

}

function createWorker(num) {
    return new Worker('./worker.js', {
        workerData: num
    });
}

(async () => {
    try {
        const result = await performCalculations();
        console.log('All workers completed successfully:', result);
    } catch {
        console.error('Error during calculations:', error);
    }
})();