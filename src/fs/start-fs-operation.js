import path from 'node:path';
import { getArguments } from '../shared/utils/get-arguments.js';
import { errors } from '../shared/info-messages/errors.js';

export const startFsOperation = (argumentAmount, callback, removeSourceFlag = false) => async (command) => {
    const data = getArguments(command, argumentAmount + 1);

    if (!data) throw new Error(errors.invalidData);

    const paths = data.filter((_, index) => !!index).map(element => path.resolve(element));

    return await callback(paths, removeSourceFlag);
};
