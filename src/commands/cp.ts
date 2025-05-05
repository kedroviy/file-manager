import fs from 'fs';
import path from 'path';

export async function copyFile(currentDir: string, src: string, destDir: string): Promise<void> {
    const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
    const destDirPath = path.isAbsolute(destDir) ? destDir : path.join(currentDir, destDir);
    const destPath = path.join(destDirPath, path.basename(srcPath));

    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => console.log(`File copied to '${destPath}'`));
    writeStream.on('error', err => console.error(`Copy failed: ${err.message}`));
}
