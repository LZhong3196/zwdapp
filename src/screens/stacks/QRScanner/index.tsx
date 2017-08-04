import * as React from "react";
import { Store, Constants, APIs, Widgets, Decorators } from "summer";
import { View, Animated, Easing } from "react-native";
import {
    Text,
} from "native-base";
import Camera from "react-native-camera";
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";

export default class QRscanner extends React.Component {
    static navigationOptions = {
        headerStyle: styles.header,
            title: <Text style={ styles.titleStyle }>扫描二维码</Text>
    };
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.scannerLineMove();
    }
    private animatedValue: any = new Animated.Value(0);
    render() {
        const animatedStyle = {
            transform: [
                {translateY: this.animatedValue}
            ],
            backgroundColor: "#fff"
        };
        return (
            <Camera
                onBarCodeRead={ this.onScanResultReceived }
                style={ styles.camera }
            >
                <View style={ styles.viewfinder }>
                    {/**扫描框边线*/}
                    <View style={ styles.scannerLineWrap }>
                        <Animated.View
                            style={ animatedStyle }>
                            <View style={ styles.scannerLine }/>
                        </Animated.View>
                    </View>
                    {/**扫描框转角-左上角*/}
                    <View style={{ ...styles.cornerStyle, ...styles.topLeftCorner }}/>
                    {/**扫描框转角-右上角*/}
                    <View style={{ ...styles.cornerStyle, ...styles.topRightCorner }}/>
                    {/**扫描框转角-左下角*/}
                    <View style={{ ...styles.cornerStyle, ...styles.bottomLeftCorner }}/>
                    {/**扫描框转角-右下角*/}
                    <View style={{  ...styles.cornerStyle, ...styles.bottomRightCorner }}/>
                </View>
                <View style={ styles.topMask }/>
                <View style={ styles.leftMask }/>
                <View style={ styles.rightMask }/>
                <View style={ styles.bottomMask }/>
                <View style={{position: "absolute", bottom: 130}}>
                    <Text style={{color: "#fff", fontSize: 14, backgroundColor: "transparent"}}>将二维码放入框内可自动扫描</Text>
                </View>
            </Camera>
        );
    }
    scannerLineMove() {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
            toValue: 200,
            duration: 2500,
            easing: Easing.linear
        }).start(() => this.scannerLineMove());
    }
    onScanResultReceived = (e: any) => {
        alert("Type: " + e.type + "\nData: " + e.data);
    }
}