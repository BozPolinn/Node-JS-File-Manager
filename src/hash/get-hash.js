import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { getArguments } from '../shared/utils/get-arguments.js';
import { errors } from '../shared/info-messages/errors.js';

export const getHash = async (command) => {
    const filepath = getArguments(command, 2);

    if (!filepath) return;

    try {
        const data = path.resolve(filepath[1]);

        const content = await fs.readFile(data);

        const hash = crypto.createHash('SHA256').update(content);

        const hex = hash.digest('hex');

        console.log('Hash: ', hex);
    } catch (error) {
        throw new Error(errors.invalidData);
    }
};
