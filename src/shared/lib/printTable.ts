import fs from 'fs/promises';
import path from 'path';

const MAX_FILENAME_LENGTH = 30;

interface FileDetails {
    index: number;
    name: string;
    type: 'File' | 'Directory';
    size?: number;
    modifiedAt?: string;
}

export async function printFilesTable(dir: string): Promise<void> {
    try {
        const items: string[] = await fs.readdir(dir);

        const fileDetails: FileDetails[] = await Promise.all(items.map(async (item, index) => {
            const itemPath = path.join(dir, item);
            const stats = await fs.stat(itemPath);
            const type: 'Directory' | 'File' = stats.isDirectory() ? 'Directory' : 'File';
            const truncatedName: string = item.length > MAX_FILENAME_LENGTH ? item.slice(0, MAX_FILENAME_LENGTH) + '...' : item;

            const fileDetail: FileDetails = {
                index: index + 1,
                name: truncatedName,
                type,
                size: stats.isFile() ? stats.size : undefined,
                modifiedAt: stats.mtime.toLocaleString()
            };

            return fileDetail;
        }));

        fileDetails.sort((a, b) => {
            if (a.type === 'Directory' && b.type === 'File') return -1;
            if (a.type === 'File' && b.type === 'Directory') return 1;
            return a.name.localeCompare(b.name);
        });

        const header: [string, string, string, string, string] = ['#', 'Name', 'Type', 'Size (bytes)', 'Last Modified'];
        const columnWidths = [5, MAX_FILENAME_LENGTH + 3, 10, 20, 25];

        console.log(header[0].padEnd(columnWidths[0]) + header[1].padEnd(columnWidths[1]) +
            header[2].padEnd(columnWidths[2]) + header[3].padEnd(columnWidths[3]) + header[4].padEnd(columnWidths[4]));
        console.log('-'.repeat(columnWidths.reduce((acc, curr) => acc + curr, 0)));

        fileDetails.forEach(item => {
            const row = `${item.index}`.padEnd(columnWidths[0]) +
                `${item.name}`.padEnd(columnWidths[1]) +
                `${item.type}`.padEnd(columnWidths[2]) +
                `${item.size ? item.size : ''}`.padEnd(columnWidths[3]) +
                `${item.modifiedAt}`.padEnd(columnWidths[4]);
            console.log(row);
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Operation failed: Unable to list files and folders in ${dir}. Error: ${error.message}`);
        } else {
            console.error('Operation failed: Unknown error occurred');
        }
    }
}
