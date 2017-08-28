
import * as React from "react";
import { ViewProperties, Platform } from "react-native";
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
    Body,
    Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Store, Widgets, Decorators } from "summer";
import { styles } from "./style";

let { ImageExtra, Icon, Toast, ShareSheet } = Widgets;


export default class Share17 extends React.Component<ViewProperties, any> {
    static navigationOptions = {
        headerTitle: "分享客户端",
        headerStyle: styles.header
    };

    constructor(props: ViewProperties, context: any) {
        super(props, context);
        this.state = {
            visible: false
        };
    }

    render() {
        const info: any = Store.get("data.about_17");
        const options: any = {
            url: Platform.OS === "ios" ? info.download_ios : info.download_android,
            message: "分享17App"
        };
        return (
            <Container style={styles.container}>
                <Card style={styles.content}>
                    <CardItem cardBody>
                        <ImageExtra source={{ uri: info.qr_code }} style={styles.qrcode} />
                    </CardItem>
                    <CardItem>
                        <Text style={styles.infoText}> 下载扫描一起做网店客户端 </Text>
                    </CardItem>
                    <Button full style={styles.button} onPress={this.open}>
                        <Text> 分享给好友 </Text>
                    </Button>
                </Card>
                <ShareSheet
                    options={options}
                    visible={this.state.visible}
                    onCancel={this.cancel} />
            </Container>
        );
    }

    open = () => {
        this.setState({
            visible: true
        });
    }

    cancel = () => {
        this.setState({
            visible: false
        });
    }
}



