import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compress = async () => {
    try {
        const inputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
        const outputFilePath = path.join(__dirname, 'files', 'archive.gz');

        const inputStream = createReadStream(inputFilePath);
        const outputStream = createWriteStream(outputFilePath);
        const gzip = zlib.createGzip();

        inputStream.pipe(gzip).pipe(outputStream);
        console.log('File has been compressed to archive.gz');
    } catch(err) {
        console.error(err);
    }
};

await compress();