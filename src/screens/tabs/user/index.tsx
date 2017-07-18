import * as React from "react";
import {
    Image
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {

} from "native-base";
import { AppStore, AppNavigator, Constants, Widgets, APIs } from "summer";
import {
    Container,
    Content,
    Thumbnail,
    Button,
    Left,
    Body,
    Text,
    Card,
    CardItem
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";

let { TabBarIcon } = Widgets;



class UserScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_USER,
        headerTitle: "个人中心",
        headerStyle: styles.header,
        tabBarLabel: "我的",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe600;"
                color={options.tintColor}
                size="md"
                focused={options.focused} />
        )
    };

    componentWillMount() {
        this.fetchUserInfo();
    }

    render() {
        const userInfo: any = AppStore.get("user.profile") || {};

        return (
            <Container style={styles.container}>
                    <Grid style={styles.grid}>
                        <Row size={2} style={styles.headerContainer}>
                            <Left style={styles.thumbnailContainer}>
                                <Thumbnail
                                    large
                                    source={{ uri: userInfo.avatar || "" }} /> 
                            </Left>
                            <Body>
                                <Text>{userInfo.account || "未设置"}</Text>
                            </Body>
                        </Row>
                        <Row size={1}></Row>
                        <Row size={2}>
                            <Button
                                light
                                onPress={this.fetchUserInfo}>
                                <Text>更新用户资料</Text>
                            </Button>
                        </Row>
                        <Row size={2}>
                            <Button
                                light
                                onPress={this.handleLogout}>
                                <Text>退出登录</Text>
                            </Button>
                        </Row>
                    </Grid>
            </Container>
        );
    }

    handleLogout = (e?: any) => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_LOGGED_OUT,
            meta: {

            }
        } as any);
    }


    fetchUserInfo = async () => {
        try {
            const res: any = await APIs.user.getUserInfo({});
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_USER_UPDATE,
                meta: {
                    storeKey: "profile",
                },
                payload: res.data
            });
        }
        catch (e) {

        }
    }


}


const mapStateToProps = (state: any) => ({
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(UserScreen);

