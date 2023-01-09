import fs from "fs/promises";

const DIR = 'directory';
const FILE = 'file';

const sortCallBack = (data, field) => {
    return data.sort((a, b) => {
        if (a[field] > b[field]) return 1;

        if (b[field] > a[field]) return -1;

        return 0;
    })
}

const getSortedListWithFullData = (list) => {
    const dataWithTypes = list.map(el => {
        el.type = el.isDirectory() ? DIR : FILE;

        return el;
    });

    const sortedByName = sortCallBack(dataWithTypes, 'name');

    return sortCallBack(sortedByName, 'type');
}

export default async function getDirectoryContentList(url, withType = false) {
    const list = await fs.readdir(url, { withFileTypes: true });

    if (!withType) {
        return list;
    }

    return getSortedListWithFullData(list);
}