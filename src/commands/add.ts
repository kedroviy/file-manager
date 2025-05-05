import fs from 'fs';
import path from 'path';

export async function addFile(currentDir: string, fileName: string): Promise<void> {
    const fullPath = path.join(currentDir, fileName);
    return fs.promises.writeFile(fullPath, '', { flag: 'wx' })
        .then(() => console.log(`File '${fileName}' created.`))
        .catch(err => console.error(`Failed to create file: ${err.message}`));
}
