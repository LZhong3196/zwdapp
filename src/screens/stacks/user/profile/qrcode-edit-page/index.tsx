import * as React from "react";
import {
    Container,
    Content,
    Text,
    Item,
    Input,
    Button
} from "native-base";
import { Store, Constants, Widgets, APIs, Navigator } from "summer";
import { styles } from "./style";
let { Icon, theme, Toast } = Widgets;


export default class QRcodeEditScreen extends React.Component<any, any> {
    private input: any;
    static navigationOptions = {
        title: "我的二维码"
    }


    render() {
        const submitDisable: boolean = false;

        return (
            <Container style={styles.container}>
                <Text>Qrocde</Text>
            </Container>
        );
    }

    resetValue = () => {
        this.state.value = undefined;
        this.setState(this.state);
    }

    onValueChange = (value: any) => {
        this.state.value = value;
        this.setState(this.state);
    }


    onSubmit = async () => {
        Toast.loading();
        try {
            let profile: any = Store.get("user.profile") || {};
            const key: string = this.props.navigation.state.params.key || undefined;
            const profileUpdate: any = {
                ...profile,
                [key]: this.state.value
            };
            const res: any = await APIs.user.postUserInfo(profileUpdate);
            Toast.success({
                text: "修改成功"
            });
            Navigator.back();
            Store.update("user.profile", profileUpdate);
        }
        catch (e) {
        }
    }
}
