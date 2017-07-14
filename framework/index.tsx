import * as React from "react";
import * as ReactNavigation from "react-navigation";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";

import request from "./libs/request";
import * as Widgets from "./components/index";
import * as Utils from "./utils/index";
import * as Cacher from "./cacher/cacher";
import * as Constants from "./constants";
import * as Decorators from "./decorators/index";
import Store from "./store/index";
import Navigator from "./navigator/index";
import * as navigationReducers from "./reducers/navigation";

export interface AppOptions {
	appName: string;
	version: string;
	apiMap: any;
	router: any;
	config: {
		env: string;
		apiHost: string;
		PSD: {
			density: number;
			minDesity: number;
		};
		RAP: {
			host: string;
			projectId: number;
		};
	};
}

function initAPIs(options: AppOptions) {
	const apis: any = {};
	const apiMap = options.apiMap;
	const apiHost = options.config.apiHost.replace(/\/$/, "");
	for (let partName of Object.keys(apiMap)) {
		let part = apiMap[partName];

		let obj: any = apis[partName] = {};
		for (let apiName of Object.keys(part)) {
			obj[apiName] = getApiHandler(part[apiName]);
		}
	}

	return apis;
	function getApiHandler(apiInfo: any) {
		apiInfo.url = (apiInfo.url || "").charAt(0) === "/" ? apiInfo.url : "/" + apiInfo.url;
		return function (data?: any) {
			return request(`${apiHost}${apiInfo.url}`, {
				method: apiInfo.method
			}, data, (options.config || {} as any).RAP);
		};
	}
}

let AppStore: Store = new Store();
let AppNavigator: Navigator;

export function setup(options: AppOptions) {
	AppNavigator = new Navigator(options.router);
	navigationReducers.setNavigator(AppNavigator.appNavigator);
	const AppWithNavigationState = AppNavigator.createApp();

	class App extends React.Component<any, any> {
		constructor(props: any, context: any) {
			super(props, context);
		}

		render() {
			return (
				<Provider store={AppStore.store}>
					<AppWithNavigationState />
				</Provider>
			);
		}
	}

	AppRegistry.registerComponent(options.appName, () => App);
	module.exports.APIs = initAPIs(options);

	// return App;
}

export {
	Widgets,
	Utils,
	Decorators,
	AppStore,
	AppNavigator,
	Cacher,
	Constants
};