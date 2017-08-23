import * as React from "react";
import { StyleSheet } from "react-native";
import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Left,
    Right,
    Button,
    Tab,
    Tabs,
    Text,
    ListItem,
    Icon as BaseIcon
} from "native-base";
import { Constants, Widgets, Store, APIs } from "summer";
import { WorkingList, FinishList, CancelList } from "./order-list";
import prompt from "react-native-prompt-android";

export { OrderStatus } from "./order-list";

let { TabBarIcon, theme, Toast } = Widgets;

const activeTextStyle = {
    color: theme.color_theme
};

export default class OrderScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: "ROUTES_ORDER",
        tabBarLabel: "采购单",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe615;"
                activeType="&#xe6c8;"
                focused={ options.focused } />
        )
    };

    render() {

        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>我的采购单</Title>
                    </Body>
                    <Right>
                        <Button transparent dark onPress={ this.onAddOrderClicked }>
                            <BaseIcon name="add"></BaseIcon>
                        </Button>
                    </Right>
                </Header>
                <Tabs
                    initialPage={ 0 }
                    tabBarUnderlineStyle={ { backgroundColor: theme.color_theme } }
                >
                    <Tab heading="进行中" activeTextStyle={ activeTextStyle }>
                        <WorkingList />
                    </Tab>
                    <Tab heading="已完成" activeTextStyle={ activeTextStyle }>
                        <FinishList />
                    </Tab>
                    <Tab heading="已作废" activeTextStyle={ activeTextStyle }>
                        <CancelList />
                    </Tab>
                </Tabs>
            </Container>
        );
    }

    onAddOrderClicked = () => {
        prompt(
            "新建采购单",
            null,
            [
                { text: "取消" },
                { text: "确定", onPress: (title: string) => { this.createOrder(title); } }
            ],
            {
                placeholder: "请输入采购单名称"
            }
        );
    }

    createOrder = async (title: string) => {
        Toast.loading({
            duration: -1
        });

        const cityId = this.getCityId();

        const response: any = await APIs.order.postCreateOrder({
            c_id: cityId,
            title: title
        });

        Toast.close();

        const oldOrders: any[] = Store.get("order.workingList") || [];
        const newOrder: any = response.data.results;

        const newOrders = [{
            ...newOrder
        }, ...oldOrders];

        Store.dispatch({
            type: Constants.ACTIONTYPES_ORDER_UPDATE,
            meta: {
                storeKey: "workingList",
            },
            payload: newOrders
        });
    }

    getCityId(): string {
        const citys: any[] = Store.get("data.city.list");
        const currentCity: string = Store.get("data.city.city");

        return citys.filter((item) => {
            return item.name === currentCity;
        })[0].cid;
    }
}