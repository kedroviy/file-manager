import fs from 'fs/promises';
import path from 'path';

export async function listFilesAndFolders(dir: string) {
    try {
        const items = await fs.readdir(dir);
        const folders: string[] = [];
        const files: string[] = [];

        for (const item of items) {
            const itemPath = path.join(dir, item);
            const stats = await fs.stat(itemPath);

            if (stats.isDirectory()) {
                folders.push(item);
            } else if (stats.isFile()) {
                files.push(item);
            }
        }

        folders.sort().forEach((folder) => {
            console.log(`${folder}/`);
        });

        files.sort().forEach((file) => {
            console.log(file);
        });
    } catch (error) {
        console.log('Operation failed: Unable to list files and folders');
    }
}
