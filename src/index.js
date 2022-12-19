import readline from 'node:readline/promises';
import os from 'node:os';
import process, { stdin, stdout } from 'node:process';

import { greet } from './shared/info-messages/greet.js';
import { goodbye } from './shared/info-messages/goodbye.js';
import { handleAction } from './handler/handle-action.js';
import { getUsername } from './shared/utils/get-username.js';
import { showLocation } from "./shared/info-messages/show-location.js";

export const fileManager = async () => {
    let username = await getUsername();

    await greet(username);

    process.on('exit', () => goodbye(username));
    process.chdir(os.homedir());
    showLocation(process.cwd());

    const stream = await readline.createInterface({ input: stdin, output: stdout });

    let command;

    do {
        command = await stream.question(`${process.cwd()} > Please, enter your command: `);

        await handleAction(command);
    } while (command !== 'exit') {
        process.exit(0);
        stream.close();
    }
};

await fileManager();
