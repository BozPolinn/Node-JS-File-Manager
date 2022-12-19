import { errors } from '../info-messages/errors.js';

export const getArguments = (command, amount = 1) => {
    let commandParts = command.split(' ').map(value => value.trim());

    if (commandParts.length < amount) {
        console.log(errors.invalidData);

        return;
    }

    if (commandParts.length > amount) {
        commandParts = command.split('"').map(value => value.trim()).filter(value => !!value);

        if (commandParts.length !== amount) {
            console.log(errors.spaceInFolderName);
            return;
        }
    }

    return commandParts;
};
