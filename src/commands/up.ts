import path from 'path';

export function moveUp(currentDir: string): string {
    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
        console.log("You are already at the root directory.");
        return currentDir;
    } else {
        console.log(`Moved up to ${parentDir}`);
        return parentDir;
    }
}
