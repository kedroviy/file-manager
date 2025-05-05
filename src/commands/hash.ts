import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export async function calculateHash(currentDir: string, filePath: string): Promise<void> {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);

    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(fullPath);

    stream.on('error', (err) => {
        console.error('Failed to read file for hashing:', err.message);
    });

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
        console.log(hash.digest('hex'));
    });
}
