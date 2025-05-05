import { moveUp } from './commands/up';
import { changeDirectory } from './commands/cd';
import { listFilesAndFolders } from './commands/ls';
import { catFile } from './commands/cat';
import { printFilesTable } from './shared/lib/printTable';
import { addFile } from './commands/add';
import { makeDirectory } from './commands/mkdir';
import { renameFile } from './commands/rn';
import { copyFile } from './commands/cp';
import { moveFile } from './commands/mv';
import { removeFile } from './commands/rm';
import { osInfo } from './commands/osInfo';
import { calculateHash } from './commands/hash';
import { compressFile } from './commands/compress';
import { decompressFile } from './commands/decompress';

interface CommandRoute {
    command: string;
    action: Function;
}

export class CommandRouter {
    private routes: CommandRoute[] = [];

    constructor() {
        this.register('up', moveUp);
        this.register('cd', changeDirectory);
        this.register('ls', listFilesAndFolders);
        this.register('cat', catFile);
        this.register('add', addFile);
        this.register('mkdir', makeDirectory);
        this.register('rn', renameFile);
        this.register('cp', copyFile);
        this.register('mv', moveFile);
        this.register('rm', removeFile);
        this.register('os', osInfo);
        this.register('hash', calculateHash);
        this.register('compress', compressFile);
        this.register('decompress', decompressFile);
    }


    register(command: string, action: Function): void {
        this.routes.push({ command, action });
    }

    async executeCommand(command: string, currentDir: string, args: string[]): Promise<string | void> {
        const route = this.routes.find(route => route.command === command);
        if (!route) {
            console.log(`Command '${command}' not found.`);
            return;
        }

        switch (command) {
            case 'up':
                return route.action(currentDir);
            case 'cd':
                return route.action(currentDir, args.join(' '));
            case 'ls':
                return await printFilesTable(currentDir);
            case 'cat':
                return route.action(currentDir, args.join(' '));
            case 'add':
            case 'mkdir':
            case 'rm':
                return route.action(currentDir, args.join(' '));
            case 'rn':
                return route.action(currentDir, args[0], args.slice(1).join(' '));
            case 'cp':
            case 'mv':
                return route.action(currentDir, args[0], args.slice(1).join(' '));
            case 'os':
                return route.action(currentDir, args[0]);
            case 'hash':
                return route.action(currentDir, args.join(' '));
            case 'compress':
            case 'decompress':
                return route.action(currentDir, args[0], args.slice(1).join(' '));
            default:
                console.log('Unknown command');
        }

    }
}
