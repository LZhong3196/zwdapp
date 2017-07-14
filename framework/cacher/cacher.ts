import * as RFS from "react-native-fs";

const CACHE_DIR = RFS.CachesDirectoryPath;
const memoryCache: HashMap<any> = {};

export function set(key: string, data: Object, temporary: boolean = false) {
    if (temporary) {
        memoryCache[key] = data;
        return;
    }

    if (typeof data === "object") {
        data = JSON.stringify(data);
    }

    return RFS.writeFile(CACHE_DIR + "/" + key, data as any, "utf8");
};

export async function get<T>(key: string): Promise<T> {
    if (memoryCache.hasOwnProperty(key)) {
        return Promise.resolve(memoryCache[key]);
    }

    let data = await RFS.readFile(CACHE_DIR + "/" + key);

    try {
        data = JSON.parse(data);
    } catch (e) {}
    return data as any;
}
