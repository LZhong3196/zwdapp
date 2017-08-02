import { is } from "immutable";

export default function pureRender(): ClassDecorator {
    return (DecoratorComponent: any) => {
        if (DecoratorComponent.prototype.shouldComponentUpdate !== undefined) {
            const constructor: any = DecoratorComponent.prototype && DecoratorComponent.prototype.constructor;
            const componentName: string = DecoratorComponent.name
                || constructor && constructor.name
                || `component` ;

            console.warn(`You are decorating ${componentName} with @pureRender().\n Check the component - '${componentName}' because it already implements 'shouldComponentUpdate'.`);
        }

        function equal(objectA: any, objectB: any): boolean {
            if (objectA === objectB || is(objectA, objectB)) {
                return true;
            }

            if (typeof objectA !== "object" || typeof objectB !== "object") {
                return false;
        }

            if (Object.keys(objectA).length !== Object.keys(objectB).length) {
                return false;
            }

            for (const key in objectA) {
                if (!is(objectA[key], objectB[key]) && (!(objectA[key] instanceof Function) || !(objectB[key] instanceof Function))) {
                    return false;
                }
            }
            return true;
        }

        function shouldComponentUpdate(nextProps: any, nextState: any) {
            return !equal(this.state, nextState) || !equal(this.props, nextProps);
        }

        DecoratorComponent.prototype.shouldComponentUpdate = shouldComponentUpdate;
    };
}

