interface HashMap<T> {
    [key: string]: T;
}

interface StoreAction {
    type: string,
    meta?: any,
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

declare module  "react-native-redux-router" {
    export let Router: any;
    export let Route: any;
    export let Schema: any;
    export let Container: any;
    export let Animations: any;
    export let routerReducer: any;
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
    
    export default class Menu extends Component<any, any> {}
    export class MenuContext extends Component<any, any> {}
    export class MenuOptions extends Component<any, any> {}
    export class MenuOption extends Component<any, any> {}
    export class MenuTrigger extends Component<any, any> {}
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


declare let module: any;
