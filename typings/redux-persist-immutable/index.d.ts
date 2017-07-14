// Type definitions for redux-persist-immutable 4.3
// Project: https://github.com/rt2zz/redux-persist-immutable#readme
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "redux-persist-immutable" {

    export function autoRehydrate(...args: any[]): any;

    export function createPersistor(store: any, ...args: any[]): any;

    export function createTransform(inbound: any, outbound: any, ...args: any[]): any;

    export function getStoredState(...args: any[]): any;

    export function persistStore(store: any, ...args: any[]): any;

    export function purgeStoredState(config: any, keys: any): any;

    export namespace autoRehydrate {
        const prototype: {
        };

    }

    export namespace createPersistor {
        const prototype: {
        };

    }

    export namespace createTransform {
        const prototype: {
        };

    }

    export namespace getStoredState {
        const prototype: {
        };

    }

    export namespace persistStore {
        const prototype: {
        };

    }

    export namespace purgeStoredState {
        const prototype: {
        };

    }

}
