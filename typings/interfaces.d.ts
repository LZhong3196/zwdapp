
interface HashMap<T> {
    [key: string]: T;
}

interface RouteMap<T> {
    [key: string]: T;
}

interface StoreAction {
    type: string,
    meta?: {
        /** Specify target state keys - For data action    */
        storeKey?: string,
        /** Target route name - For navigation action */
        routeName?: string,
        /**  - For navigation action */
        params?: any,
        /** 往回跳到指定页的上一个路由 | default - 跳到主页Main */
        resetRouteName?: string,
    },
    error?: boolean,
    payload?: any
}


interface Dictionary<T> {
    [key: string]: T;
}

declare module 'react-native/Libraries/Components/ScrollResponder' {
    export interface ScrollResponderHandles {
        scrollResponderHandleTouchStart?: Function;
        scrollResponderHandleTouchMove?: Function;
        scrollResponderHandleTouchEnd?: Function;
        scrollResponderHandleScrollBeginDrag?: Function;
        scrollResponderHandleScrollEndDrag?: Function;
        scrollResponderHandleMomentumScrollBegin?: Function;
        scrollResponderHandleMomentumScrollEnd?: Function;
        scrollResponderHandleStartShouldSetResponder?: Function;
        scrollResponderHandleStartShouldSetResponderCapture?: Function;
        scrollResponderHandleScrollShouldSetResponder?: Function;
        scrollResponderHandleResponderGrant?: Function;
        scrollResponderHandleTerminationRequest?: Function;
        scrollResponderHandleTerminate?: Function;
        scrollResponderHandleResponderRelease?: Function;
        scrollResponderHandleResponderReject?: Function;
    }
    export let Mixin: any;
}


declare module 'mockjs' {
    interface Map<T> {
        [key: string]: T
    }

    export function mock(template: Map<any>): any;
    export function mock(rulr: RegExp, template: Map<any>): any;
    export function mock(rulr: RegExp, rtype: string, template: Map<any>): any;
    export function mock(rulr: RegExp, rtype: string, template: (options: any) => any): any;
}

declare module "react-native-linear-gradient" {
    import { Component } from 'react';
    import { ViewProperties } from 'react-native';
    interface LinearGradientProps extends ViewProperties {
        start?: number[];
        end?: number[];
        locations?: number[];
        colors?: string[];
    }

    export default class LinearGradient extends Component<LinearGradientProps, any> {

    }
}


declare module "react-native-menu" {
    import { Component } from 'react';

    export default class Menu extends Component<any, any> { }
    export class MenuContext extends Component<any, any> { }
    export class MenuOptions extends Component<any, any> { }
    export class MenuOption extends Component<any, any> { }
    export class MenuTrigger extends Component<any, any> { }
}

declare module "child_process" {
    export class ChildProcess {

    }
}

declare module "events" {
    export class EventEmitter {

    }
}

declare module "stream" {
    export class Readable {

    }

    export class Writable {

    }
}

declare module "react-native-camera" {
    import { Component } from 'react';
    export default class Menu extends Component<any, any> { }
}


declare module "@actra-development-oss/redux-persist-transform-filter-immutable" {
    import { Transform } from "redux-persist";
    export function createFilter(reducerName: any, inboundPaths: any, outboundPaths?: any, ...args: any[]): Transform<any, any>;
    export function createWhitelistFilter(reducerName: any, inboundPaths: any, outboundPaths?: any): Transform<any, any>;
    export function createBlacklistFilter(reducerName: any, inboundPaths: any, outboundPaths: any): Transform<any, any>;
    export function filterObject(_ref: any, state: any): any
    export function persistFilter(state: any, ...args: any[]): any;
    export default createFilter;
}

declare module "react-native-share" {
    import { Component } from "react";
    export class ShareSheet extends Component<any, any> {}
    export class Share {
        static open(options: {
            /** URL you want to share (you can share a base64 file url only in iOS & Android ) */
            url: string;
            /** File mime type (optional) */
            type: string;
            message: string;
            title?: string;
            subject?: string;
            excludedActivityTypes?: string;
        }): void;
        static shareSingle(options: any): void;
    }
    export default Share;
}

declare let module: any;
