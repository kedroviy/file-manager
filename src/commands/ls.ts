import fs from 'fs/promises';
import path from 'path';

export async function listFilesAndFolders(dir: string): Promise<string> {
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

        folders.sort();
        files.sort();

        let result = '';

        folders.forEach((folder) => {
            result += `${folder}/\n`;
        });

        files.forEach((file) => {
            result += `${file}\n`;
        });

        return result || "No files or folders found.";
    } catch (error) {
        console.error('Operation failed: Unable to list files and folders', error);
        return "Operation failed: Unable to list files and folders.";
    }
}
