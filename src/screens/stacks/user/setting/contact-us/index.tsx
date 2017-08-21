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
    Thumbnail,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Communications from "react-native-communications";
import { styles } from "./style";
let { Icon, theme, Toast } = Widgets;


interface ItemProps extends ViewProperties {
    title: string;
    name: string;
    value?: string;
    onPress?: Function;
    lastItem?: boolean;
}

class Item extends React.Component<ItemProps, any> {
    render() {
        let {
            title,
            value,
            onPress,
            lastItem
        } = this.props;
        const itemStyle: any = lastItem ? {
            ...styles.listItem,
            ...styles.lastItem
        } : styles.listItem;
        return (
            <ListItem
                style={itemStyle}
                onPress={!!onPress ? (e?: any) => onPress(e) : this.onPress}>
                <Left>
                    <Text>{title}</Text>
                </Left>
                <Right style={styles.itemRight}>
                    {!!value && <Text style={styles.rightText}>{value}</Text>}
                    <Icon type="&#xea54;" color={theme.color_base} size="xs" />
                </Right>
            </ListItem>
        );
    }

    onPress = () => { };
}

export default class ContactUs extends React.Component<any, any> {
    static navigationOptions = {
        headerTitle: "联系客服",
        headerStyle: styles.header
    };

    render() {
        const info: any = Store.get("data.about_17") || {};
        return (
            <Container>
                <List style={styles.listContainer}>
                    <ListItem itemDivider>
                        <Text>{`服务时间为: 每天 09:00 - 21:30`}</Text>
                    </ListItem>
                    <Item
                        title="客服QQ"
                        name="qq"
                        value={info.qq}
                        onPress={this.connectQQ} />
                    <Item
                        title="客服热线"
                        name="contact"
                        value={info.contact}
                        lastItem
                        onPress={this.phoneCall} />
                </List>
            </Container>
        );
    }

    phoneCall = () => {
        const contact: string = Store.get("data.about_17.contact");
        Communications.phonecall(contact, true);
    }

    connectQQ = () => {
        Toast.info({
            text: "开发中"
        });
    }
}




