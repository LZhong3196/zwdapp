import * as React from "react";
import {
    Container,
    Content,
    Text
} from "native-base";
import { Store } from "summer";
import { styles } from "./style";

export default class AboutUs extends React.Component<any, any> {
    static navigationOptions = {
        headerTitle: "关于我们",
        headerStyle: styles.header
    };

    render() {
        const intro: string = Store.get("data.about_17.intro");
        return (
            <Container style={styles.container}>
                <Content>
                    <Text> {intro} </Text>
                </Content>
            </Container>
        );
    }
}



