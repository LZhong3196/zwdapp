import * as React from "react";
import { StyleSheet } from 'react-native';
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
} from 'native-base';
import { Constants, Widgets } from "summer";
import { WorkingList, FinishList, CancelList } from './order-list';

let { TabBarIcon, theme } = Widgets;

const activeTextStyle = {
    color: theme.color_theme
}

export default class OrderScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_ORDER,
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
                        <Button transparent dark>
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
}