import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
    try {
        const inputFilePath = path.join(__dirname, 'files', 'archive.gz');
        const outputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

        const inputStream = createReadStream(inputFilePath);
        const outputStream = createWriteStream(outputFilePath);
        const gunzip = zlib.createGunzip();

        inputStream.pipe(gunzip).pipe(outputStream);

        console.log('File successfully decompressed to fileToDecompress.txt');
    }
    catch(error) {
        console.error('Error during decompression:', error.message);
    }

};

await decompress();