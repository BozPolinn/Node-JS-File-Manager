import process from 'node:process';
import os from 'node:os';
import { getArguments } from '../shared/utils/get-arguments.js';
import { errors } from '../shared/info-messages/errors.js';
import { getPath } from '../shared/utils/get-path.js';

export const cd = (command) => {
    const data = getArguments(command, 2);

    if (!data || (data[1].startsWith('..') && process.cwd() === os.homedir())) return;

    try {
        const pathData = getPath(data[1]);

        process.chdir(pathData);
    } catch (error) {
        throw new Error(errors.invalidData);
    }
};
