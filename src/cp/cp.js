import { fork } from 'child_process';

const spawnChildProcess = async (args) => {
    const child = fork('./files/script.js');

    child.send(args)
    child.on('message', (message) => {
        console.log('Message from child process', message);
    })

    child.on('exit', (code) => {
        console.log(`Child process has been finished with code ${code}`);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['rrrr', 'a'])
