import path from "node:path";
import checkFsElementExists from '../shared/utils/check-fs-element-exists.js';
import getDirectoryContentList from '../shared/utils/get-directory-content-list.js';
import { errors } from '../shared/info-messages/errors.js';

export default async function list(url) {
    const navPath = path.resolve(url);

    const folderExists = await checkFsElementExists(navPath);

    if (!folderExists) throw new Error(errors.invalidData);

    const data = await getDirectoryContentList(path.resolve(url), true);

    console.table(data)
};
