import fs from 'fs';
import path from 'path';

export async function renameFile(currentDir: string, oldPath: string, newName: string): Promise<void> {
    const fullOldPath = path.isAbsolute(oldPath) ? oldPath : path.join(currentDir, oldPath);
    const newFullPath = path.join(path.dirname(fullOldPath), newName);
    return fs.promises.rename(fullOldPath, newFullPath)
        .then(() => console.log(`Renamed to '${newName}'.`))
        .catch(err => console.error(`Failed to rename file: ${err.message}`));
}
