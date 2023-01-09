import fs from 'fs';
import path from 'node:path';
import checkFsElementExists from '../shared/utils/check-fs-element-exists.js';
import { getArguments } from '../shared/utils/get-arguments.js';
import { getPath } from '../shared/utils/get-path.js';
import { errors } from '../shared/info-messages/errors.js';

export const copy = async (command, removeOriginalFile = false) => {
    const data = getArguments(command, 3);

    if (!data) return;

    const filePath = path.resolve(getPath(data[1]));
    const copyPath = path.resolve(getPath(data[2]), path.basename(filePath));
    const filesExist = await checkFsElementExists(filePath);
    const copyExist = await checkFsElementExists(copyPath);

    if (copyExist || !filesExist) throw new Error(errors.failed);

    const readStream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 16 * 1024 });

    if (removeOriginalFile) readStream.on('close', async () => await fs.promises.unlink(filePath));

    const writeStream = fs.createWriteStream(copyPath, { encoding: 'utf-8' });
    readStream.pipe(writeStream);
};
