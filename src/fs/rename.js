import fs from 'fs/promises';
import path from 'node:path';
import checkFsElementExists from '../shared/utils/check-fs-element-exists.js';
import { getPath } from '../shared/utils/get-path.js';
import { getArguments } from '../shared/utils/get-arguments.js';
import { errors } from '../shared/info-messages/errors.js';

export const rename = async (command) => {
    const data = getArguments(command, 3);

    if (!data) throw new Error(errors.invalidData);

    const sourcePath = path.resolve(getPath(data[1]));
    const resultPath = getPath(data[2]);
    const sourceExists = await checkFsElementExists(sourcePath);
    const newFileExists = await checkFsElementExists(resultPath);

    if (!sourceExists || newFileExists) throw new Error(errors.failed);

    await fs.rename(sourcePath, resultPath);
};
