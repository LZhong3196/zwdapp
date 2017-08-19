import * as React from "react";
import {
    Image,
    StatusBar,
    Switch,
    Alert,
    Platform,
    NativeModules,
    ViewProperties,
    DeviceEventEmitter
} from "react-native";
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
import { Store, Constants, Widgets, APIs, Decorators, Navigator, Routes } from "summer";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Picker as DatePicker } from "./datepicker";
import { styles } from "./style";

let { Icon, theme, Toast } = Widgets;
let RNUploader = NativeModules.RNUploader;


interface AvatarPickerProps extends ViewProperties {
    avatar: string;
}

class AvatarPicker extends React.Component<AvatarPickerProps, any> {
    private unmount: boolean = false;
    constructor(props: AvatarPickerProps, context: any) {
        super(props, context);
        this.state = {
            file: {} as Object,
            isUploading: false,
            progress: undefined
        };
    }


    componentWillUnmount() {
        this.unmount = true;
    }

    render() {

        return (
            <ListItem onPress={this.handleAvatarChange} >
                <Left>
                    <Text>头像</Text>
                </Left>
                <Right style={styles.itemRight}>
                    <Thumbnail source={{ uri: this.props.avatar }} />
                    <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                </Right>
            </ListItem>
        )
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
        const profile: any = Store.get("user.profile");
        try {
            Toast.loading();
            let image = await ImagePicker.openPicker({
                loadingLabelText: "加载中...",
                cropping: true,
                width: 300,
                height: 300,
                compressImageMaxWidth: 300,
                compressImageMaxHeight: 300
            }) as ImagePicker.Image;
            Toast.close();
            let res: any = await APIs.user.uploadAvatar({
                files: [{
                    name: `avatar_${profile.account}`,
                    filepath: image.path,
                    filetype: image.mime,
                    filename: `avatar_${profile.account}`
                }],
                params: { type: "avatar" }
            });
            Toast.success({
                text: "上传成功"
            });
            this.updateAvatar(res.data.list[0].url);
        }
        catch (e) {
            Toast.close();
        }
    }

    openCamera = async () => {
        const profile: any = Store.get("user.profile");
        try {
            let image = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true
            }) as ImagePicker.Image;
            let res: any = await APIs.user.uploadAvatar({
                files: [{
                    name: `avatar_${profile.account}`,
                    filepath: image.path,
                    filetype: image.mime,
                    filename: `avatar_${profile.account}`
                }],
                params: { type: "avatar" }
            });
            Toast.success({
                text: "上传成功"
            });
            this.updateAvatar(res.data.list[0].url);
        }
        catch (e) {

        }
    }

    updateAvatar = (src: string) => {
        if (!!src) {
            const profile: any = Store.get("user.profile");
            Store.update("user.profile", {
                ...profile,
                avatar: src
            });
        }
    }
}


interface ProfileItemProps extends ViewProperties {
    title: string;
    name: string;
    value?: string;
    valueContent?: React.ReactNode;
    onClick?: Function;
    lastItem?: boolean;
}

@Decorators.pureRender()
class ProfileItem extends React.Component<ProfileItemProps, any> {
    render() {
        let {
            title,
            value,
            valueContent,
            onClick,
            lastItem
        } = this.props;
        const itemStyle: any = lastItem ? {
            ...styles.listItem,
            ...styles.lastItem
        } : styles.listItem;
        return (
            <ListItem
                style={itemStyle}
                onPress={!!onClick ? () => onClick() : this.handleEdit}>
                <Left>
                    <Text>{title}</Text>
                </Left>
                <Right style={styles.itemRight}>
                    {!!valueContent ? valueContent : (
                        <Text style={styles.rightText}>{value || "未设置"}</Text>
                    )}
                    <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                </Right>
            </ListItem>
        );
    }

    handleEdit = () => {
        Navigator.to(Routes.ROUTES_PROFILE_EDIT, {
            name: this.props.name,
            value: this.props.value
        });
    }
}

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
                    <AvatarPicker avatar={profile.avatar} />
                    <ProfileItem title="真实姓名" name="name" value={profile.name} />
                    <ProfileItem title="昵称" name="account" value={profile.account} />
                    <ProfileItem title="我的二维码名片" name="qrcode" value={profile.qrcode} lastItem />
                </List>
                <List style={styles.listContainer}>
                    <ProfileItem title="旺旺" name="taobao_account" value={profile.taobao_account} />
                    <ProfileItem title="微信" name="wechat" value={profile.wechat} />
                    <ProfileItem title="QQ" name="qq" value={profile.qq} lastItem />
                </List>
                <List style={styles.listContainer}>
                    <ProfileItem title="生日" name="birthday" valueContent={<DatePicker value={profile.birthday} />} lastItem />
                </List>
            </Container>
        );
    }

    handleQRcodeEdit = () => {

    }

}

