import path from 'path';
import { fileURLToPath } from 'url';
import { Transform } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, callback) {
            callback(null, chunk.toString().split('').reverse().join(''));
        }
    })
    process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();