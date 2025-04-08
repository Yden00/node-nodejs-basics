import os from 'os';
import { Worker } from 'worker_threads';

const performCalculations = async () => {
    const cpuNumber = os.cpus().length;
    let count = 10;

    const workerPromises = [];

    for (let i = 0; i < cpuNumber; i++) {
        const workerPromise = new Promise((resolve, reject) => {
            const worker = createWorker(count);
            const workerId = count;
            count++;

            worker.on('message', (data) => {
                resolve({
                    status: 'resolved',
                    data: data,
                    workerId: workerId
                });
            });

            worker.on('error', () => {
                reject({
                    status: 'error',
                    data: null,
                    workerId: workerId
                });
            });

            worker.on('exit', (exitCode) => {
                if (exitCode !== 0) {
                    reject({
                        status: 'error',
                        data: null,
                        workerId: workerId
                    });
                }
            });
        });

        workerPromises.push(workerPromise);
    }

    try {
        const results = await Promise.all(workerPromises);
        console.log('All worker results:', results);
    } catch (error) {
        console.error('One or more workers encountered an error:', error);
    }
};

function createWorker(num) {
    return new Worker('./worker.js', {
        workerData: num
    });
}

await performCalculations();