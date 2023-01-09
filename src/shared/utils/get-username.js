import { argv, stdin, stdout } from 'node:process';
import readline from "node:readline/promises";
import { errors } from "../info-messages/errors.js";

export const getUsername = async () => {
    let username;

    try {
        const args = argv.slice(2);

        username = args.find(arg => arg.includes('username')).split('=')[1];
    } catch (e) {
        do {
            const usernameStream = await readline.createInterface({ input: stdin, output: stdout });

            username = await usernameStream.question(errors.username);

            usernameStream.close();
        } while (!username.trim());
    }

    return username;
}