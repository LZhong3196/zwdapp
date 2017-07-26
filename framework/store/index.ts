import * as Immutable from "immutable";
import {
    Store as ReduxStore,
    createStore,
    applyMiddleware,
    compose
} from "redux";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { AsyncStorage } from "react-native";
import { persistStore, autoRehydrate } from "redux-persist-immutable";
import { PERSIST_STORE_WHITE_LIST, ROUTES_MAIN } from "./../constants";
import { initConnectivityInfo } from "./../libs/networking";

import appReducer from "./../reducers/index";

const isDebuggingInChrome = (global as any).__DEV__ && !!window.navigator.userAgent;

const logger: Redux.Middleware = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    timestamp: false,
    stateTransformer: (state: State) => state.toJS()
});

export interface ImmutableMap<T> extends Map<string, any> {
    get<K extends keyof T>(name: K): T[K];
    merge(...iterables: Array<T>[]): this;
    setIn(keyPath: Iterable<any>, value: any): this;
    toJS: any;
}

export type State = ImmutableMap<{
    nav?: any;
    user?: any;
    data?: any;
    market?: any;
    order?: any;
    notification?: any;
    search?: any;
    goods?: any;
}>;

export const initialState: State = Immutable.fromJS({
    nav: {
        index: 0,
        routes: [{
            routeName: ROUTES_MAIN,
            key: ROUTES_MAIN
        }]
    },
    user: {},
    data: {},
    market: {},
    order: {},
    notification: {},
    search: {},
    goods: {}
});


export default class Store {
    static instance: Store;
    private appStore: Redux.Store<any>;

    constructor() {
        this.appStore = this.createAppStore();
    }

    public get store() {
        return this.appStore;
    }

    public get<T>(keys: string): T {
        let keyPath: Array<any> = keys.trim().split(".");
        let data: any = this.appStore.getState().getIn(keyPath);

        try {
            data = data.toJS();
        }
        catch (e) { }
        return data;
    }

    public dispatch(action: StoreAction) {
        this.appStore.dispatch(action);
    }

    private createAppStore() {
        const middlewares: Redux.Middleware[] = [
            reduxThunk,
            logger
        ];

        const enhancer: any = compose(
            applyMiddleware(...middlewares),
            autoRehydrate()
            // devtools
        );

        const store: Redux.Store<any> = createStore( appReducer, initialState, enhancer );

        const rehydrationCompleted: any = compose(
            initConnectivityInfo
        );

        persistStore(store, {
            whitelist: PERSIST_STORE_WHITE_LIST,
            storage: AsyncStorage
        }, rehydrationCompleted);

        if (isDebuggingInChrome) {
            (window as any).store = store;
        }
        return store;

    }

}

