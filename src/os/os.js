import os from 'node:os';
import { getArguments } from '../shared/utils/get-arguments.js';
import { errors } from '../shared/info-messages/errors.js';

const osCommands = {
    eol: '--EOL',
    username: '--username',
    cpus: '--cpus',
    homedir: '--homedir',
    architecture: '--architecture',
};

const executeOsCommand = (command) => {
    switch (command) {
        case osCommands.eol:
            console.log('EOL:', os.EOL);
            break;
        case osCommands.username:
            console.log('Username: ', os.userInfo().username);
            break;
        case osCommands.homedir:
            console.log('Homedir: ', os.homedir());
            break;
        case osCommands.cpus:
            const cpus = os.cpus();
            console.log('Amount of CPUS: ', cpus.length);
            cpus.forEach((cpu, index) => console.log(index + 1, 'Model: ', cpu.model));
            break;
        case osCommands.architecture:
            console.log('Architecture: ', os.arch());
            break;
        default: throw new Error(errors.invalidData);
    }
}

export const osOperation = (command) => {
    const data = getArguments(command, 2);

    if (!!data) executeOsCommand(data[1]);
};
