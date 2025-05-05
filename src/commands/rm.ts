import fs from 'fs';
import path from 'path';

export async function removeFile(currentDir: string, target: string): Promise<void> {
    const targetPath = path.isAbsolute(target) ? target : path.join(currentDir, target);
    return fs.promises.unlink(targetPath)
        .then(() => console.log(`Deleted '${target}'`))
        .catch(err => console.error(`Failed to delete: ${err.message}`));
}
