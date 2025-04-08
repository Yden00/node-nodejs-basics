import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
    try {
        const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

        const readableStream = fs.createReadStream(filePath);

        const hash = createHash('sha256');

        readableStream.pipe(hash);

        hash.on('finish', () => {
            const hexHash = hash.digest('hex');
            console.log(hexHash);
        });

        readableStream.on('error', (err) => {
            console.error('Error in reading file stream:', err);
        });

    } catch (err) {
        console.error('Error during hash calculation:', err);
    }
};

await calculateHash();