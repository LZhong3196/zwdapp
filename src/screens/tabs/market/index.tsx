import * as React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
    Button,
    StyleSheet,
    View,
    Image,
    TouchableHighlight
} from "react-native";
import { APIs, Widgets, AppStore, Constants } from "summer";
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body,
    Input,
    Item,
    Left,
    Header
} from "native-base";

let { TabBarIcon } = Widgets;

import { marketStyle } from "./style";



class MarketScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_MARKET,
        tabBarLabel: "逛市场",
        tabBarIcon: <TabBarIcon type="&#xe61e;" />
    };
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            list: undefined
        }
    }

    componentWillMount() {
        this.fetchList();
    }

    render() {
        const data: any = AppStore.get("market.list") || [];
        return (
            <Container>
                <Header>
                    <Left>
                        
                    </Left>
                    <Body>
                        <Input placeholder="请输入店铺名/档口号/旺旺号" />
                    </Body>
                </Header>
                <Content>
                    <List>
                        {!!data.length ? data.map((item: any, index: number) => (
                            <ListItem
                                style={marketStyle.container}
                                onPress={() => {
                                    AppStore.dispatch({
                                        type: Constants.ACTIONTYPES_NAVIGATION_TO,
                                        meta: {
                                            routeName: Constants.ROUTES_SHOP,
                                            params: {
                                                id: item.u_id
                                            }
                                        }
                                    });
                                }}
                                key={index}>
                                <Thumbnail
                                    large
                                    square
                                    source={{ uri: item.image }}>
                                </Thumbnail>
                                <Body>
                                    <Text style={marketStyle.itemTitle}>
                                        {item.title}
                                    </Text>
                                    <Text style={marketStyle.itemIntro}>
                                        {item.main}
                                    </Text>
                                    <Text style={marketStyle.itemIntro}>
                                        {item.price}
                                    </Text>
                                    <Text style={marketStyle.itemIntro}>
                                        {item.service}
                                    </Text>
                                </Body>
                            </ListItem>
                        )) : <Text>loading ...</Text>}
                    </List>
                </Content>
            </Container>
        );
    }

    fetchList = async () => {
        try {
            const res: any = await APIs.market.getShopList({});
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_MARKET_UPDATE,
                meta: {
                    storeKey: "list",
                },
                payload: res.data.results
            });
        }
        catch (e) {

        }
    }

}

const mapStateToProps = (state: any) => ({
    data: state.get("market").toJS(),
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(MarketScreen)

