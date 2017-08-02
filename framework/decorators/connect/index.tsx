import { connect as RRConnect } from "react-redux";


export default function connect(...stateKeys: Array<string>): ClassDecorator {
    return (DecoratorComponent: any) => {
        const mapStateToProps = (state: any) => {
            let stateMap: Dictionary<any> = {};
            stateKeys.forEach((key: string) => {
                stateMap[key] = state.get(key)!.toJS();
            });
            return stateMap;
        };

        return RRConnect(mapStateToProps)(DecoratorComponent) as any;
    };
}