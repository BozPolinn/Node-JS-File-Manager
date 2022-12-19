import process from 'node:process';
import list from '../fs/list.js';
import { showLocation } from '../shared/info-messages/show-location.js';
import { up } from '../navigate/up.js';
import { cd } from '../navigate/cd.js';
import { getHash } from '../hash/get-hash.js';
import { osOperation } from '../os/os.js';
import { compress } from '../gzip/compress.js';
import { decompress } from '../gzip/decompress.js';
import { remove } from '../fs/delete.js';
import { read } from '../fs/read.js';
import { create } from '../fs/create.js';
import { rename } from '../fs/rename.js';
import { copy } from '../fs/copy.js';
import { writeln } from '../shared/utils/writeln.js';
import { commands } from '../shared/commands.js';
import { errors } from '../shared/info-messages/errors.js';

export const handleAction = async (data) => {
    const command = data.split(' ')[0].trim();

    try {
        switch (command) {
            case commands.up:
                up();
                break;
            case commands.cd:
                cd(data);
                break;
            case commands.ls:
                await list(process.cwd());
                break;
            case commands.os:
                osOperation(data);
                break;
            case commands.hash:
                await getHash(data);
                break;
            case commands.compress:
                await compress(data);
                break;
            case commands.decompress:
                await decompress(data);
                break;
            case commands.rm:
                await remove(data);
                break;
            case commands.cat:
                await read(data);
                break;
            case commands.add:
                await create(data);
                break;
            case commands.rn:
                await rename(data);
                break;
            case commands.cp:
                await copy(data);
                break;
            case commands.mv:
                await copy(data, true);
                break;
            default:
                throw new Error(errors.invalidData);
        }
    } catch (error) {
        if (error.message !== errors.failed || error.message !== errors.invalidData) {
            writeln(error.message);
        } else {
            writeln(errors.failed);
        }
    }


    showLocation(process.cwd());
}
