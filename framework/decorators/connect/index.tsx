import { connect as RRConnect } from "react-redux";
import { State } from "./../../store/index";

const isDebuggingInChrome = (global as any).__DEV__ && !!window.navigator.userAgent;

export default function connect(...stateKeys: Array<string>): ClassDecorator {
    return (DecoratorComponent: any) => {
        if (DecoratorComponent.prototype.shouldComponentUpdate !== undefined && isDebuggingInChrome) {
            const constructor: any = DecoratorComponent.prototype && DecoratorComponent.prototype.constructor;
            const componentName: string = DecoratorComponent.name
                || constructor && constructor.name
                || `component`;

            console.warn(`You are decorating ${componentName} with @connect().\n Check the component - '${componentName}' because it already implements 'shouldComponentUpdate'.`);
        }
        const mapStateToProps = (state: State) => {
            let stateMap: Dictionary<any> = {};
            stateKeys.forEach((keys: string) => {
                const keyPath: Array<string> = keys.split(".");
                const key: string = keyPath.join("_");
                stateMap[key] = state.getIn(keyPath);
            });
            return stateMap;
        };
        return RRConnect(mapStateToProps)(DecoratorComponent) as any;
    };
}