import fs from 'node:fs';
import { createBrotliCompress } from 'zlib';
import { getArguments } from '../shared/utils/get-arguments.js';
import { getPath } from '../shared/utils/get-path.js';
import { errors } from '../shared/info-messages/errors.js';

export const compress = async (command) => {
    const data = getArguments(command, 3);

    if (!data) return;

    const pathToFile = getPath(data[1]);
    const newLocation = getPath(data[2]);

    try {
        const input = fs.createReadStream(pathToFile, 'utf-8');
        const output = fs.createWriteStream(newLocation);
        const value = await createBrotliCompress();

        input.pipe(value).pipe(output);
    } catch (error) {
        throw new Error(errors.failed);
    }
};
