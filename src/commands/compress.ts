import fs from 'fs';
import path from 'path';
import { createBrotliCompress } from 'zlib';

export async function compressFile(currentDir: string, src: string, dest: string): Promise<void> {
    const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
    const destPath = path.isAbsolute(dest) ? dest : path.join(currentDir, dest);

    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);
    const brotli = createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);

    writeStream.on('finish', () => console.log(`Compressed to ${destPath}`));
    writeStream.on('error', (err) => console.error('Compression error:', err.message));
}
