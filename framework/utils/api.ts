import request  from "../libs/request";

export function get(url: string, data?: any) {
    return request(url, { method: "GET" }, data);
}

export function post(url: string, data?: any) {
    return request(url, { method: "POST" }, data);
}

export function patch(url: string, data?: any) {
    return request(url, { method: "PATCH" }, data);
}

export function del(url: string, data?: any) {
    return request(url, { method: "DELETE" }, data);
}