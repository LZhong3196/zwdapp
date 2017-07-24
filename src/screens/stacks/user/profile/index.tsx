import * as React from "react";
import {
    Image,
    StatusBar,
    Switch,
    Alert
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { AppStore, Constants, Widgets, APIs } from "summer";
import {
    Container,
    Content,
    Button,
    Left,
    Body,
    Text,
    Right,
    List,
    ListItem,
    Toast
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";
let { Icon, theme } = Widgets;

class SettingScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerBackTitle: "",
        headerTitle: "设置",
        headerStyle: styles.header
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
        };
    }

    render() {
        const account: any = AppStore.get("user.account") || {};

        return (
            <Container>
                <StatusBar barStyle="default" />
                <List style={styles.listContainer}>
                    <ListItem style={styles.listItem}>
                        <Left>
                            <Text>联系我们</Text>
                        </Left>
                        <Right>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem style={{ ...styles.listItem, ...styles.lastItem }}>
                        <Left>
                            <Text>关于17</Text>
                        </Left>
                        <Right>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                </List>
                <List style={styles.listContainer}>
                    <ListItem style={styles.listItem}>
                        <Left>
                            <Text>仅wifi下开启大图</Text>
                        </Left>
                        <Right>
                            <Switch value={true}/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Left>
                            <Text>清除缓存</Text>
                        </Left>
                        <Right>
                            <Text style={styles.cacheInfo}>
                                11MB 
                                <Icon
                                    type="&#xea54;"
                                    color={theme.color_base}
                                    size="xs" />
                            </Text>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Left>
                            <Text>点评</Text>
                        </Left>
                        <Right>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem style={{ ...styles.listItem, ...styles.lastItem }}>
                        <Left>
                            <Text>分享17客户端</Text>
                        </Left>
                        <Right>
                             <Icon type="&#xea54;" color={theme.color_base} size="xs" /> 
                        </Right>
                    </ListItem>
                </List>
                <List style={styles.listContainer}>
                    <ListItem
                        onPress={!!account.isLoggedIn ? this.onLogoutConfirm : this.login}
                        style={{ ...styles.listItem, ...styles.lastItem }}>
                        <Body>
                            <Text style={styles.logoutText}>
                                {!!account.isLoggedIn ? "退出登录" : "去登录"}
                            </Text>
                        </Body>
                    </ListItem>
                </List>
            </Container>
        );
    }

    login = () => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_LOGIN,
                key: Constants.ROUTES_LOGIN,
            }
        })
    }

    onLogoutConfirm = () => {
        Alert.alert(
            "提示",
            "是否退出登录",
            [ { text: "取消" }, { text: "确认", onPress: this.handleLogout } ]
        );
    }

    handleLogout = () => {
        try {
            let res: any = APIs.account.getLogout({});
        }
        catch (e) {
        }

        const user: any = AppStore.get("user");
        const account: any = user.account;
        const userState: any = {
            ...user,
            profile: {},
            account: {
                ...account,
                isLoggedIn: false,
                token: ""
            }
        };

        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_BACK,
        });
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_USER_UPDATE,
            payload: userState
        });
    }

}

const mapStateToProps = (state: any) => ({
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(SettingScreen);