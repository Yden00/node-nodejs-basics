import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
        const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
        const readableStream = fs.createReadStream(filePath);

        readableStream.on('data', (chunk) => {
            process.stdout.write(chunk)
        })

        readableStream.on('error', (err) => {
            process.stdout.write('FS operation failed:', err)
        })

        readableStream.on('end', () => {
            console.log('\nFile has been read successfully')
        })
};

await read();