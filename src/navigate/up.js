import os from 'node:os';
import process from 'node:process';

export const up = () => {
    const currentDir = process.cwd();

    if (os.homedir() === currentDir) return;

    const splitPath = currentDir.split('/');
    splitPath.pop();
    process.chdir('/' + splitPath.join('/'))
};