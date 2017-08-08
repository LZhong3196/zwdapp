import * as RNFS from "react-native-fs";
import {
    ImageCache
} from "react-native-img-cache";

/** Return image cache size in bytes */
export async function getCacheSize(): Promise<number> {
    let cacheSize: number = 0;
    const imageCache: any = ImageCache.get();
    const cache = imageCache.cache;

    for (const key in cache) {
        let stat: RNFS.StatResult = await RNFS.stat(cache[key].path);
        cacheSize = cacheSize + parseInt(stat.size);
    }
    return cacheSize;
}

export async function clear() {
    let res: any = await ImageCache.get().clear();
    return res;
}