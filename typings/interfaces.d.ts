interface HashMap<T> {
    [key: string]: T;
}

interface StoreAction {
    type: string,
    meta?: {
        /** 目标state的key值 - For data action    */
        storeKey?: string,
        /** 目标路由 - For navigation action */
        routeName?: string,
        /** 目标路由key | 建议与[routeName]一致 - For navigation action */
        key?: string,
        /** 传递给目标路由的参数 - For navigation action */
        params?: any,

        /** 往回跳到指定页的上一个路由 | default - 跳到主页Main */
        resetRouteName?: string,
    },
    error?: boolean,
    payload?: Object
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

declare let module: any;
