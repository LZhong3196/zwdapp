import {
    DeviceEventEmitter,
    NativeModules
} from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import { Toast } from "./../index";
import request, { ResponseError } from "./../../libs/request";
import { getToken } from "./../../libs/request-extra";

const IS_DEV = (global as any).__DEV__;
const IS_DEBUG = (global as any).__DEBUG__;

let RNUploader = NativeModules.RNUploader;

class ProgressInfo {
    static progress: number = 0;
    static update(value: number) {
        this.progress = value;
        Toast.loading({
            duration: -1,
            text: `正在上传... ${value} %`
        });
    }
}

async function _upload(url: string, headers: any, file: {
    name: string;
    fileNmae: string;
    filepath: string;
    filetype?: string;
}) {
    return RNFetchBlob.fetch("POST", url, headers, [{
        name: file.name,
        filename: file.fileNmae,
        type: file.filetype,
        data: RNFetchBlob.wrap(file.filepath)
    }])
        .uploadProgress({ interval: 250 }, (written: number, total: number) => {
            ProgressInfo.update(Math.round(written * 100 / total));
        })
        .then((res: any) => {
            return JSON.parse(res.data);
        })
        .catch((error: any) => {
            throw error;
        });
}

export type UploadOptions = {
    files: Array<{
        name: string;
        fileNmae: string;
        filepath: string;
        filetype?: string;
    }>;
    params?: any;
};

export default async function upload(url: string, uploadOptions: UploadOptions) {
    let successProgress: Array<Object> = [];
    let failedProgress: Array<Object> = [];

    try {
        let headers: any = {
            "Accept": "application/json",
            "Authorization": getToken()
        };
        ProgressInfo.progress = 0;

        for (let file of uploadOptions.files) {
            try {
                let res: any = await _upload(url, headers, file).then();
                successProgress = [...successProgress, {
                    ...file,
                    url: res.data.url
                }];
            }
            catch (e) {
                failedProgress = [file.name, ...failedProgress];
            }
        }
        if (!!successProgress.length) {
            Toast.success();
            return {
                data: {
                    successCount: successProgress.length,
                    list: successProgress
                },
                meta: {
                    code: 0,
                    msg: ""
                }
            };
        }
        else {
            throw new Error("all failed");
        }
    }
    catch (e) {
        throw e;
    }
}


