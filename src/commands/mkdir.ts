import fs from 'fs';
import path from 'path';

export async function makeDirectory(currentDir: string, dirName: string): Promise<void> {
    const fullPath = path.join(currentDir, dirName);
    return fs.promises.mkdir(fullPath, { recursive: false })
        .then(() => console.log(`Directory '${dirName}' created.`))
        .catch(err => console.error(`Failed to create directory: ${err.message}`));
}
