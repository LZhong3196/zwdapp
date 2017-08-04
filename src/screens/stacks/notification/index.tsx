import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { Store, Constants, APIs, Widgets, Decorators } from "summer";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Thumbnail,
    Body,
    Right,
    H3,
    Text,
    Button
} from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";

let { Icon } = Widgets;

class NotificationScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerStyle: styles.header,
        title: "通知"
    };
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <TouchableWithoutFeedback
                            onPress={ () => this.openChatPage("1213") }>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail source={{ uri: "https://unsplash.it/200/300?image=0" }}/>
                                </Left>
                                <Body>
                                    <H3>dfasdgfsdgsd</H3>
                                    <Text>dfasdgfsdgsd</Text>
                                </Body>
                                <Right>
                                    <Text>12: 04</Text>
                                </Right>
                            </ListItem>
                        </TouchableWithoutFeedback>
                    </List>
                </Content>
            </Container>
        );
    }
    openChatPage = (id: string) => {
        // Store.dispatch({
        //     type: Constants.ACTIONTYPES_NAVIGATION_TO,
        //     meta: {
        //         routeName: Constants.ROUTES_CHAT,
        //         params: {
        //             id: id
        //         }
        //     }
        // });
    }
}

const mapStateToProps = (state: any) => ({
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(NotificationScreen);

