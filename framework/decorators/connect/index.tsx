import { connect as RRConnect } from "react-redux";


export default function connect(...stateKeys: Array<string>): ClassDecorator {
    return (DecoratorComponent: any) => {
        const mapStateToProps = (state: any) => {
            let stateMap: Dictionary<any> = {};
            stateKeys.forEach((key: string) => {
                stateMap[key] = state.get(key);
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