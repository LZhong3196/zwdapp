import * as React from "react";
import {
    Image,
    StatusBar,
    Switch,
    Alert
} from "react-native";
import { AppStore, Constants, Widgets, APIs, Decorators } from "summer";
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
    Toast,
    Thumbnail,
    ActionSheet
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";
let { Icon, theme } = Widgets;
import { Picker as DatePicker} from "./datepicker";


@Decorators.connect("user")
export default class ProfileScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerBackTitle: null as any,
        headerTitle: "个人资料",
        headerStyle: styles.header
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            date: undefined
        };
    }

    render() {
        const profile: any = AppStore.get("user.profile") || {};

        return (
            <Container>
                <StatusBar barStyle="default" />
                <List style={styles.listContainer}>
                    <ListItem>
                        <Left>
                            <Text>头像</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Thumbnail style={{ backgroundColor: "#EFEFEF" }} source={{ uri: profile.avatar }} />
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem
                        style={styles.listItem}
                        onPress={() => this.handleItemEdit("name", profile.name)}>
                        <Left>
                            <Text>真实姓名</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Text style={styles.rightText}>{profile.name || "未设置"}</Text>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem
                        style={styles.listItem}
                        onPress={() => this.handleItemEdit("account", profile.account)}>
                        <Left>
                            <Text>昵称</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Text style={styles.rightText}>{profile.account || "未设置"}</Text>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem style={{...styles.listItem, ...styles.lastItem}}>
                        <Left>
                            <Text>我的二维码名片</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Icon type="&#xe685;" color={theme.color_base} size="xs" />
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                </List>
                <List style={styles.listContainer}>
                    <ListItem
                        style={styles.listItem}
                        onPress={() => this.handleItemEdit("taobao_account", profile.taobao_account)}>
                        <Left>
                            <Text>旺旺</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Text style={styles.rightText}>{profile.taobao_account || "未设置"}</Text>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={() => this.handleItemEdit("wechat", profile.wechat)}
                        style={{...styles.listItem, ...styles.lastItem}}>
                        <Left>
                            <Text>微信</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Text style={styles.rightText}>{profile.wechat || "未设置"}</Text>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={() => this.handleItemEdit("qq", profile.qq)}
                        style={{...styles.listItem, ...styles.lastItem}}>
                        <Left>
                            <Text>QQ</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <Text style={styles.rightText}>{profile.qq || "未设置"}</Text>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                </List>
                <List style={styles.listContainer}>
                    <ListItem style={{...styles.listItem, ...styles.lastItem}}>
                        <Left>
                            <Text>生日</Text>
                        </Left>
                        <Right style={styles.itemRight}>
                            <DatePicker value={profile.birthday} />                                
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                </List>
            </Container>
        );
    }

    handleItemEdit = (key: string, value: any) => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_PROFILE_EDIT,
                params: {
                    key: key,
                    value: value
                }
            }
        })
    };



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

