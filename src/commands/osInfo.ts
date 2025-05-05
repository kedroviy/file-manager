import os from 'os';

export async function osInfo(currentDir: string, flag: string): Promise<void> {
    switch (flag) {
        case '--EOL':
            console.log(JSON.stringify(os.EOL));
            break;
        case '--cpus':
            const cpus = os.cpus();
            console.log(`Total CPUs: ${cpus.length}`);
            cpus.forEach((cpu, i) => {
                console.log(
                    `CPU ${i + 1}: ${cpu.model}, ${(
                        cpu.speed / 1000
                    ).toFixed(2)} GHz`
                );
            });
            break;
        case '--homedir':
            console.log(`Home dir: ${os.homedir()}`);
            break;
        case '--username':
            console.log(`Username: ${os.userInfo().username}`);
            break;
        case '--architecture':
            console.log(`Architecture: ${os.arch()}`);
            break;
        default:
            console.log('Invalid OS flag');
    }
}
