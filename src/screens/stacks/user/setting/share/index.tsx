
import * as React from "react";
import { ViewProperties } from "react-native";
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
    Body,
    Button
} from "native-base";
import { Store, Widgets, Decorators } from "summer";
import Share, { ShareSheet } from "react-native-share";
import { styles } from "./style";

let { ImageExtra } = Widgets;

interface SheetProps extends ViewProperties {
    visible: boolean;
}

@Decorators.pureRender()
class Sheet extends React.Component<SheetProps, any> {

}

export default class Share17 extends React.Component<ViewProperties, any> {
    static navigationOptions = {
        headerTitle: "分享客户端",
        headerStyle: styles.header
    };

    render() {
        const qr_code: string = Store.get("data.about_17.qr_code");
        return (
            <Container style={styles.container}>
                <Card style={styles.content}>
                    <CardItem cardBody>
                        <ImageExtra source={{ uri: qr_code }} style={styles.qrcode}/>
                    </CardItem>
                    <CardItem>
                        <Text style={styles.infoText}> 下载扫描一起做网店客户端 </Text>
                    </CardItem>
                    <Button full style={styles.button}>
                        <Text> 分享给好友 </Text>
                    </Button>
                </Card>
            </Container>
        );
    }
}



