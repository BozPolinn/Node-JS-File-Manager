import fs from 'fs/promises';
import checkFsElementExists from '../shared/utils/check-fs-element-exists.js';
import { startFsOperation } from './start-fs-operation.js';
import { errors } from '../shared/info-messages/errors.js';

export const create = startFsOperation(1,async (command) => {
    const fileExists = await checkFsElementExists(command[0]);

    if (fileExists) throw new Error(errors.failed);

    await fs.writeFile(command[0], '');
});
