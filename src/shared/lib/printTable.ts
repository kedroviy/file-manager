import fs from 'fs/promises';
import path from 'path';

const MAX_FILENAME_LENGTH = 30;

interface FileDetails {
    index: number;
    name: string;
    type: 'File' | 'Directory';
}

export async function printFilesTable(dir: string): Promise<void> {
    try {
        const items: string[] = await fs.readdir(dir);

        const fileDetails: FileDetails[] = await Promise.all(items.map(async (item) => {
            const itemPath = path.join(dir, item);
            const stats = await fs.stat(itemPath);
            const type: 'Directory' | 'File' = stats.isDirectory() ? 'Directory' : 'File';
            const truncatedName: string = item.length > MAX_FILENAME_LENGTH ? item.slice(0, MAX_FILENAME_LENGTH) + '...' : item;

            return { name: truncatedName, type, index: 0 };
        }));

        fileDetails.sort((a, b) => {
            if (a.type === 'Directory' && b.type === 'File') return -1;
            if (a.type === 'File' && b.type === 'Directory') return 1;
            return a.name.localeCompare(b.name);
        });

        fileDetails.forEach((item, index) => {
            item.index = index + 1;
        });

        // Заголовки таблицы
        const header: [string, string, string] = ['#', 'Name', 'Type'];
        const columnWidth = 40;

        // Выводим заголовок таблицы
        console.log(header[0].padEnd(5) + header[1].padEnd(columnWidth) + header[2].padEnd(10));
        console.log('-'.repeat(5 + columnWidth + 10));

        // Выводим строки таблицы
        fileDetails.forEach(item => {
            const row = `${item.index}`.padEnd(5) +
                `${item.name}`.padEnd(columnWidth) +
                `${item.type}`.padEnd(10);
            console.log(row);
        });

    } catch (error) {
        console.log('Operation failed: Unable to list files and folders');
    }
}
