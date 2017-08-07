import * as React from "react";
import {
    Image,
    StatusBar,
    Switch,
    Alert
} from "react-native";
import { Store, Constants, Widgets, APIs, Decorators, Navigator } from "summer";
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
    Thumbnail,
    ActionSheet
} from "native-base";
import ImagePicker from "react-native-image-crop-picker";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Picker as DatePicker } from "./datepicker";
import { styles } from "./style";

let { Icon, theme, Toast } = Widgets;

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
        const profile: any = Store.get("user.profile") || {};

        return (
            <Container>
                <StatusBar barStyle="default" />
                <List style={styles.listContainer}>
                    <ListItem onPress={this.handleAvatarChange}>
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
                    <ListItem style={{ ...styles.listItem, ...styles.lastItem }}>
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
                        style={{ ...styles.listItem, ...styles.lastItem }}>
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
                        style={{ ...styles.listItem, ...styles.lastItem }}>
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
                    <ListItem style={{ ...styles.listItem, ...styles.lastItem }}>
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
        Navigator.to(Constants.ROUTES_PROFILE_EDIT, {
            key: key,
            value: value
        });
    }

    handleAvatarChange = () => {
        const options: Array<string> = ["拍照", "从相册选择", "取消"];
        ActionSheet.show({
            options: options,
            cancelButtonIndex: options.length - 1,
            destructiveButtonIndex: 4,
            title: "修改头像"
        },
            (index: number) => {
                switch (index) {
                    case 0: {
                        this.openCamera();
                        break;
                    }
                    case 1: {
                        this.openAlbum();
                        break;
                    }
                    default: break;
                }
            });
    }

    openAlbum = async () => {
        try {
            let source = await ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true
            }) as ImagePicker.Image;
            console.log("%c image : ", "color: #4BBAEA", source);
            Toast.loading({ duration: -1 });
            let res: any = APIs.user.postUserInfo({
            });
            Toast.success();
        }
        catch (e) {

        }
    }

    openCamera = async () => {
        try {
            let source = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true
            }) as ImagePicker.Image;
        }
        catch (e) {

        }
    }

    handleLogout = () => {
        try {
            let res: any = APIs.account.getLogout({});
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

}

