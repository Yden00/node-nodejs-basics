import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt')
    try {
        await fs.access(filePath, fs.constants.F_OK)
        throw new Error('FS operation failed')
    }
    catch(error) {
        if (error.message === 'FS operation failed') {
            console.error(error);
            return;
        }

        await fs.writeFile(filePath, 'I am fresh and young', 'utf-8');
        console.log('File has been successfully created');
    }
};

await create();