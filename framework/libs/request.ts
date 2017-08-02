/**
 *  Networking utils powered by @author lion
 */
import * as MockJS from "mockjs";
import * as RFS from "react-native-fs";

import * as RAP from "./rap";
import * as Constants from "../constants";

import { resolveError, getToken } from "./request-extra";
import { isNetworkConnected } from "./networking";

const IS_DEV = (global as any).__DEV__;
const IS_DEBUG = (global as any).__DEBUG__;
const RAP_MODEL_CACHE_DIR = RFS.CachesDirectoryPath;

export interface RequestOptions {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: HashMap<any>;
    JSONParser?: (res: any) => any;
    body?: any;
}

export class ResponseError extends Error {
    constructor(public code: number, public message: string) {
        super(message);
    }
}

async function _fetch(url: string, options: RequestOptions) {
    const res = await fetch(url, options);
    const resText = await res.text();
    const resJSON = (options.JSONParser || defaultJSONPaser)(resText);

    if (resJSON.meta && resJSON.meta.code !== 0) {
        throw new ResponseError(resJSON.meta.code, resJSON.meta.msg);
    }

    return resJSON;
}

export default async function request(
    url: string,
    options: RequestOptions,
    data: any,
    rapConfig?: {
        host: string;
        projectId: number;
    }
) {
    options = Object.assign({
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: data ? JSON.stringify(data) : null
    }, options);

    if (/^GET|HEAD$/i.test(options.method)) {
        delete options.body;
        if (data) {
            const paramStr = dataToParamStr(data);
            url += (url.indexOf("?") > -1 ? "&" : "?") + paramStr;
        }
    }

    const originMethod = options.method.toLocaleLowerCase();
    const originUrl = url;
    url = fixMethodParam(url, originMethod);

    let rap: RAP.RAP;
    let isFromRAP = false;
    let pathname: string;


    if (rapConfig && (IS_DEV || IS_DEBUG)) {
        rap = await RAP.getModel(
            rapConfig.host,
            rapConfig.projectId,
            IS_DEV ? RAP.BLOCK_ONLY_WHITE_LIST : RAP.DISABLED
        );
    }

    if (rap) {
        url = RAP.convertUrlToRelative(url);
        isFromRAP = !IS_DEBUG && rap.router(url);
        if (isFromRAP) {
            url = rap.prefix + url;
            options.method = "GET";
            options.JSONParser = jsTypeJSONParser;
            console.log(`RAP: 请求 ${url} 提交的参数:`, data || {});
        } else {
            url = fixMethodParam(originUrl, originMethod);
        }
    }
    let res: any = null;
    let isFromRAPCache: boolean;

    try {
        res = await _fetch(url, options);
    } catch (e) {
        let isConnected = isNetworkConnected();
        if (!isConnected) {
            e.code = Constants.REQUEST_ERROR_NETINFO_NONE;
        }

        let resolveResult: any = await resolveError(e);
        if (e.code === Constants.REQUEST_ERROR_UNAUTH && !!resolveResult) {
            try {
                res = await _fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        "Authorization": resolveResult
                    }
                });
            }
            catch (e) {
                if (e.code !== Constants.REQUEST_ERROR_UNAUTH) {
                    await resolveError(e);
                }
                throw e;
            }
        }
        else {
            if (!isFromRAP) {
                throw e;
            }
            try {
                let key = getRAPModelCacheKey(url, originMethod);
                res = JSON.parse(await RFS.readFile(key));
                console.log(JSON.stringify(res));
                isFromRAPCache = true;
                console.log(`get "${url}" rap model from local cache.`);
            } catch (e2) {
                throw e;
            }
        }
    }

    let resJSON: any = null;

    if (isFromRAP) {
        resJSON = MockJS.mock(res);
        console.log(`RAP: 请求 ${url} 返回的Mock数据:`, resJSON);
        if (!isFromRAPCache) {
            RFS.writeFile(getRAPModelCacheKey(url, originMethod), JSON.stringify(res), "utf8");
        }
    }

    if (!isFromRAP && rap && rap.isInWhiteList(url)) {
        const realData = resJSON;
        url = RAP.convertUrlToRelative(url);

        const mockData = _fetch(
            url,
            Object.assign(
                {},
                options,
                { method: "GET", JSONParser: jsTypeJSONParser }
            )
        );

        RAP.checkerHandler({ data: realData, url }, mockData);
    }

    return resJSON;
};

const METHOD_PARAM_REGEXP = /_method=[^&#]+/i;
function fixMethodParam(url: string, method: string) {
    if (METHOD_PARAM_REGEXP.test(url)) {
        return url.replace(/_method=[^&#]+/i, `_method=${method}`);
    } else {
        return url + (url.indexOf("?") > -1 ? "&" : "?") + `_method=${method}`;
    }
}


function defaultJSONPaser(res: any) {
    return JSON.parse(res);
}

function jsTypeJSONParser(res: any) {
    return (new Function(`return (${res})`))();
}

function dataToParamStr(data: any) {
    const kv: string[] = [];
    for (let key of Object.keys(data)) {
        kv.push(`${key}=${encodeURIComponent(data[key])}`);
    }
    return kv.join("&");
}

function getRAPModelCacheKey(url: string, method: string) {
    url = url.replace(/\?.*$/, "");
    url = encodeURIComponent(url);
    return `${RAP_MODEL_CACHE_DIR}/${method.toLowerCase()}_${url}.json`;
}
