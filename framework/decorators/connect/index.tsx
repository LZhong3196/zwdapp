import { connect as RRConnect } from "react-redux";


export default function connect(...stateKeys: Array<string>): ClassDecorator {
    return (DecoratorComponent: any) => {
        const mapStateToProps = (state: any) => {
            let stateMap: Dictionary<any> = {};
            stateKeys.forEach((keys: string) => {
                let keyPath: Array<any> = keys.trim().split(".");
                let key = keyPath[keyPath.length-1];
                stateMap[key] = state.getIn(keyPath);
                try {
                    stateMap[key] = stateMap[key].toJS();
                }
                catch (e) { }
            });
            return stateMap;
        };
        return RRConnect(mapStateToProps)(DecoratorComponent) as any;
    };
}