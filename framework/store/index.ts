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
import { Transform, Persistor } from "redux-persist";
import { persistStore, autoRehydrate } from "redux-persist-immutable";
import { createWhitelistFilter } from "@actra-development-oss/redux-persist-transform-filter-immutable";
import {
    PERSIST_STORE_WHITE_LIST,
    ROUTES_MAIN
} from "./../constants";
import { initConnectivityInfo } from "./../libs/networking";
import appReducer from "./../reducers/index";
import * as CONSTANTS from "./../constants";

const IS_DEV = (global as any).__DEV__;
const IS_DEBUG = (global as any).__DEBUG__;
const isDebuggingInChrome = (IS_DEV || IS_DEBUG) && !!window.navigator.userAgent;

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
    getIn(searchKeyPath: Iterable<any>, notSetValue?: any): any;
}

export type State = ImmutableMap<{
    [key: string]: any
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
    goods: {},
    home: {},
    market: {},
    search: {},
    notification: {},
    order: {}
});


export default class Store {
    static instance: Store;
    private appStore: Redux.Store<any>;
    private persistor: Persistor;

    static get<T>(keys: string): T{
        if (!this.instance) {
            return undefined;
        }
        return this.instance.get(keys);
    }

    static update(keys: string, payload: any) {
        if (!this.instance) {
            return;
        }
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

    static getPersistor(): Persistor {
        return this.instance.persistor;
    }

    constructor() {
        this.appStore = this.createAppStore();
    }

    public get store() {
        return this.appStore;
    }

    public get<T>(keys: string): T {
        let keyPath: Array<any> = keys.split(".");
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
        const persistStoreWhiteList: Array<string> = Object.keys(PERSIST_STORE_WHITE_LIST);
        const transforms: Array<Transform<any, any>> = createPersistTransform();
        this.persistor = persistStore(store, {
            whitelist: persistStoreWhiteList,
            storage: AsyncStorage,
            transforms: transforms,
        }, rehydrationCompleted);


        if (isDebuggingInChrome) {
            (window as any).store = store;
        }
        return store;
    }
}


function createPersistTransform(): Array<Transform<any, any>> {
    let filterTransforms: Array<Transform<any, any>> = [];
    for (const key in PERSIST_STORE_WHITE_LIST) {
        if (!!PERSIST_STORE_WHITE_LIST[key].length) {
            const subsetFilter: Transform<any, any> = createWhitelistFilter(
                key,
                PERSIST_STORE_WHITE_LIST[key],
                PERSIST_STORE_WHITE_LIST[key]
            );
            filterTransforms = [
                ...filterTransforms,
                subsetFilter
            ];
        }
    }
    return filterTransforms;
}
