import fs from 'fs';
import path from 'path';

export async function moveFile(currentDir: string, src: string, destDir: string): Promise<void> {
    const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
    const destDirPath = path.isAbsolute(destDir) ? destDir : path.join(currentDir, destDir);
    const destPath = path.join(destDirPath, path.basename(srcPath));

    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        fs.promises.unlink(srcPath)
            .then(() => console.log(`Moved to '${destPath}'`))
            .catch(err => console.error(`Copy done but failed to delete original: ${err.message}`));
    });

    writeStream.on('error', err => console.error(`Move failed: ${err.message}`));
}
