import path from 'node:path';

export const getPath = (data) => {
    return path.isAbsolute(data) ? data : path.resolve(data);
}
