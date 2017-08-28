import * as React from "react";
import {
    Image,
    StatusBar,
    Switch,
    Alert,
    StyleSheet,
    ViewProperties,
    LayoutAnimation
} from "react-native";
import { Store, Constants, Widgets, APIs, Decorators, Navigator, ImageCache, Routes } from "summer";
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
    Thumbnail
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import ConnectivityControl from "./connectivity-control";
import { styles } from "./style";
let { Icon, theme, Toast } = Widgets;

interface SettingItemProps extends ViewProperties {
    title: string;
    name: string;
    value?: string;
    valueContent?: React.ReactNode;
    onPress?: Function;
    hideRightArrow?: boolean;
    lastItem?: boolean;
    linkTo?: string;
}

@Decorators.pureRender()
class SettingItem extends React.Component<SettingItemProps, any> {
    static defaultProps = {
        onPress: (e?: any) => { }
    };

    render() {
        let {
            title,
            value,
            valueContent,
            hideRightArrow,
            onPress,
            lastItem,
            linkTo
        } = this.props;
        const itemStyle: any = lastItem ? {
            ...styles.listItem,
            ...styles.lastItem
        } : styles.listItem;

        return (
            <ListItem
                style={itemStyle}
                onPress={!!linkTo ? () => Navigator.to(linkTo) : (e?: any) => onPress(e)}>
                <Left>
                    <Text>{title}</Text>
                </Left>
                <Right style={styles.itemRight}>
                    {!!valueContent && valueContent}
                    {!!value && <Text style={styles.rightText}>{value}</Text>}
                    {!hideRightArrow && <Icon type="&#xea54;" color={theme.color_base} size="xs" />}
                </Right>
            </ListItem>
        );
    }

    onPress = () => {
    }
}

@Decorators.pureRender()
class ImageCacheItem extends React.Component<any, any> {
    private unmount: boolean = false;
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            cacheSize: undefined
        }
    }

    componentWillMount() {
        this.getImageCacheSize();
    }

    componentWillUnmount() {
        this.unmount = true;
    }

    componentWillReceiveProps(nextProps: any) {
        this.getImageCacheSize();
    }


    render() {
        let {
            cacheSize
        } = this.state;
        return (
            <SettingItem
                title="清除缓存"
                name="cache"
                value={!cacheSize ? `` : `${cacheSize} MB`}
                onPress={this.clearCache} />
        )
    }

    getImageCacheSize = async () => {
        try {
            let res: number = await ImageCache.getCacheSize();
            if (this.unmount) {
                return;
            }
            this.setState({
                cacheSize: (res / 1024 / 1024).toFixed(2)
            });
        }
        catch (e) {
        }
    }

    clearCache = async () => {
        if (this.state.cacheSize == 0) {
            return;
        }
        Toast.loading({
            duration: -1
        });
        try {
            let res: any = await ImageCache.clear();
            Toast.success({
                text: "清除成功",
                duration: 1000
            });
            this.getImageCacheSize();
        }
        catch (e) {
            Toast.close();
        }
    }

}

@Decorators.connect("user")
export default class SettingScreen extends React.Component<any, any> {
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

    componentWillMount() {
        this.fetchDevelopInfo();
    }

    render() {
        const user: any = Store.get("user") || {};
        const account = user.account || {};
        const profile = user.profile || {};

        return (
            <Container>
                <StatusBar barStyle="default" />
                <List style={styles.listContainer}>
                    <ListItem onPress={this.onProfileEdit}>
                        <Thumbnail source={{ uri: profile.avatar }} />
                        <Body style={{ flexGrow: 4 }}>
                            <Text>{profile.account || "未登录"}</Text>
                            <Text note>{`真实姓名: ${profile.name || "未设置"}`}</Text>
                        </Body>
                        <Right style={styles.itemRight}>
                            <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                        </Right>
                    </ListItem>
                    <SettingItem title="联系我们" name="contact_us" linkTo={Routes.ROUTES_CONTACT_US} />
                    <SettingItem title="关于17" name="about_17" linkTo={Routes.ROUTES_ABOUT_US} lastItem />
                </List>
                <List style={styles.listContainer}>
                    <SettingItem title="仅wifi下开启大图" name="connect_limit" valueContent={<ConnectivityControl />} hideRightArrow />
                    <ImageCacheItem />
                    <SettingItem title="点评" name="comment" onPress={this.comment}/>
                    <SettingItem title="分享17客户端" name="share" linkTo={Routes.ROUTES_SHARE_17} lastItem />
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
        Navigator.to(Routes.ROUTES_LOGIN);
    }

    onProfileEdit = () => {
        Navigator.to(Routes.ROUTES_PROFILE);
    }

    onLogoutConfirm = () => {
        Alert.alert(
            "提示",
            "是否退出登录",
            [{ text: "取消" }, { text: "确认", onPress: this.handleLogout }]
        );
    }

    handleLogout = async () => {
        try {
            Toast.loading({
                text: "处理中"
            });
            let res: any = await APIs.account.getLogout({});
        }
        catch (e) {
        }

        const user: any = Store.get("user");
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

        Navigator.back();
        Store.update("user", userState);
    }

    fetchDevelopInfo = async () => {
        try {
            let res: any = await APIs.about.get17info({});
            Store.update("data.about_17", res.data);
        }
        catch (e) { }
    };

    comment = () => {
        Toast.info({
            text: "开发中"
        });
    }
}




