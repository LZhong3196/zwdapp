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
import * as CONSTANTS from "./../constants";

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
}>;

export const initialState: State = Immutable.fromJS({
    nav: {
        index: 0,
        routes: [{
            routeName: ROUTES_MAIN,
            key: ROUTES_MAIN
        }]
    }
});


export default class Store {
    static instance: Store;
    private appStore: Redux.Store<any>;

    static get<T>(keys: string): T{
        if (!this.instance) {
            return undefined;
        };
        return this.instance.get(keys);
    }

    static update(keys: string, payload: Object) {
        const storeKeys: Array<string> = keys.split(".");
        const storeKey: string = storeKeys.slice(1).join(".");
        const appStore: Store = this.instance;
        const actionType: string = `ACTIONTYPES_${storeKeys[0].toLocaleUpperCase()}_UPDATE`;
        appStore.dispatch({
            type: (CONSTANTS as any)[actionType],
            meta: {
                storeKey: storeKey
            },
            payload: payload
        });
    }

    static dispatch(action: StoreAction) {
        if (!this.instance) {
            return;
        }
        this.instance.dispatch(action);
    }

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

