import * as React from "react";
import * as Lodash from "lodash";
import { NavigationActions } from "react-navigation";
import { AppStore, AppNavigator, Constants, APIs, Widgets } from "summer";
import { } from "react-native";
import {
    Button,
    Text,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Right,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";

let { Icon } = Widgets;

export default class GoodsList extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        const list: any = AppStore.get("market.goods") || [];
        return (
            <Grid style={styles.goodsListContainer}>
                {!!list.length ?
                    list.map((item: any, index: number) => (
                        <Col
                            key={index}
                            style={styles.goodsCardContainer}>
                            <Card
                                onTouchEnd={() => {
                                    AppStore.dispatch({
                                        type: Constants.ACTIONTYPES_NAVIGATION_TO,
                                        meta: {
                                            routeName: Constants.ROUTES_GOODS,
                                            params: {
                                                id: item.u_id
                                            }
                                        }
                                    });
                                }}>
                                <CardItem
                                    cardBody
                                    style={styles.cardItem}>
                                    <Thumbnail
                                        square
                                        style={styles.goodsImage}
                                        source={{ uri: item.image }} />
                                </CardItem>
                                <CardItem cardBody>
                                    <Text style={styles.goodsTitle}>
                                        {item.title || ""}
                                    </Text>
                                </CardItem>
                                <CardItem cardBody>
                                    <Text style={styles.goodsPrice}>
                                        {`¥  ${item.price || "-- --"}`}
                                    </Text>
                                </CardItem>
                            </Card>
                        </Col>
                    ))
                    : <Text>loading...</Text>}
            </Grid>
        );
    }

    openGoodsPage = (id: string) => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_GOODS,
                params: {
                    id: id
                }
            }
        });
    }
}

