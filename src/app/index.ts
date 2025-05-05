import readline from 'readline';
import { CommandRouter } from '../router';

let currentDir = process.env.HOME || process.env.USERPROFILE as string;

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter a command: '
});

const router = new CommandRouter();

function printCurrentDir(dir: string) {
    console.log(`You are currently in ${dir}`);
}

rl.on('line', async (line: string) => {
    const trimmed = line.trim();

    if (trimmed === '.exit') {
        rl.close();
        return;
    }

    const [command, ...args] = trimmed.split(' ');
    const result = await router.executeCommand(command, currentDir, args);

    if (result) {
        currentDir = result as string;
    }

    printCurrentDir(currentDir);
    rl.prompt();
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});

printCurrentDir(currentDir);
rl.prompt();
