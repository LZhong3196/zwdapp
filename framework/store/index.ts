import * as Immutable from "immutable";
import {
    Store as ReduxStore,
    createStore,
    applyMiddleware,
    compose as ReduxCompose
} from "redux";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { AsyncStorage } from "react-native";
import { persistStore, autoRehydrate } from "redux-persist-immutable";
import { PERSIST_STORE_WHITE_LIST, ROUTES_MAIN } from "./../constants";

import appReducer from "./../reducers/index";

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

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
    search?: any
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
});



export default class Store {
    private appStore: Redux.Store<any>;

    constructor() {
        this.appStore = this.createAppStore();
    }

    public get store() {
        return this.appStore;
    }

    public get<T>(keys: string): T {
        let keyPath: Array<any> = keys.trim().split(".");
        let data = this.appStore.getState();
        return !!keyPath.length && !!data.getIn(keyPath) ? data.getIn(keyPath).toJS() : undefined;
    }

    public dispatch(action: StoreAction) {
        this.appStore.dispatch(action);
    }

    private createAppStore() {
        const middlewares: Redux.Middleware[] = [
            reduxThunk,
            logger
        ];

        const enhancer: any = ReduxCompose(
            applyMiddleware(...middlewares),
            autoRehydrate()
            // devtools
        );
        const store = createStore( appReducer, initialState, enhancer );

        if (isDebuggingInChrome) {
            (window as any).store = store;
        }
        persistStore(store, {
            whitelist: PERSIST_STORE_WHITE_LIST,
            storage: AsyncStorage
        });
        return store;

    }

}

