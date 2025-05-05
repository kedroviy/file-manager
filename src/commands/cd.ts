import fs from 'fs/promises';
import path from 'path';

export async function changeDirectory(currentDir: string, targetPath: string) {
    try {
        const resolvedPath = path.resolve(currentDir, targetPath);
        const stats = await fs.stat(resolvedPath);

        if (stats.isDirectory()) {
            return resolvedPath;
        } else {
            console.log('Operation failed: Not a directory');
        }
    } catch (error) {
        console.log('Operation failed: Directory does not exist');
    }

    return currentDir;
}
