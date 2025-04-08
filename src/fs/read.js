import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    try {
        await fs.access(filePath);
        const data = await fs.readFile(filePath, 'utf-8');
        console.log(data)
    }
    catch(err) {
        if (err.code !== 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err
        }

    }
};

await read();