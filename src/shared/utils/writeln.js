import { stdout } from 'node:process';
import os from 'node:os';

export function writeln(message) {
    stdout.write(`${message}${os.EOL}`);
}