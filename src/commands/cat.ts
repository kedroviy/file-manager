import fs from 'fs';
import path from 'path';

export async function catFile(currentDir: string, fileName: string): Promise<void> {
    try {
        const sanitizedFileName = fileName.trim();
        const filePath = path.join(currentDir, sanitizedFileName);

        const stats = await fs.promises.stat(filePath);

        if (!stats.isFile()) {
            console.log('Operation failed: Not a file');
            return;
        }

        const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

        stream.on('data', chunk => process.stdout.write(chunk));
        stream.on('end', () => console.log('\n'));
        stream.on('error', () => console.log('Operation failed: Cannot read file'));

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Operation failed: File not found or error occurred. Error: ${error.message}`);
        } else {
            console.log('Operation failed: Unknown error occurred');
        }
    }
}
