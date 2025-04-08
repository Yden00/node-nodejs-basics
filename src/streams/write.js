import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writableStream = fs.createWriteStream(filePath);

    process.stdin.pipe(writableStream);
    console.log('Enter Text')

    process.stdin.on('end', () => {
        console.log('Recording completed')
    });

    process.stdin.on('error', (err) => {
        console.log('FS operation error', err)
    })

    writableStream.on('error', (err) => {
        console.log('FS operation error', err)
    })
};

await write();