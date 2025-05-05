import path from 'path';

export async function moveUp(currentDir: string): Promise<string> {
    try {
        const parentDir = path.dirname(currentDir);

        if (parentDir === currentDir) {
            console.log("You are already at the root directory.");
            return currentDir;
        } else {
            console.log(`Moved up to ${parentDir}`);
            return parentDir;
        }
    } catch (error) {
        console.error("An error occurred while moving up:", error);
        throw new Error("Failed to move up to the parent directory.");
    }
}
