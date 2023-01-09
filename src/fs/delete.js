import fs from 'fs/promises';
import checkFsElementExists from '../shared/utils/check-fs-element-exists.js';
import { errors } from '../shared/info-messages/errors.js';
import { startFsOperation } from './start-fs-operation.js';

export const remove = startFsOperation(1, async (command) => {
    const fileExists = await checkFsElementExists(command[0]);

    if (!fileExists) throw new Error(errors.failed);

    await fs.unlink(command[0]);
});
