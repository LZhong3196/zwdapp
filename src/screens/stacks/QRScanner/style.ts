import { Constants } from "summer";

const {
    SCREEN_HEIGHT,
    SCREEN_WIDTH
} = Constants;

export const styles: any = {
    header: {
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
    },
    titleStyle: {
        color: "#fff"
    },
    buttonsContainer: {
        position: "absolute",
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
    },
    camera: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    viewfinder: {
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 200
    },
    topLeftCorner: {
        position: "absolute",
        top: 0,
        left: 0,
        borderLeftWidth: 4,
        borderTopWidth: 4,
    },
    topRightCorner: {
        position: "absolute",
        top: 0,
        right: 0,
        borderRightWidth: 4,
        borderTopWidth: 4,
    },
    bottomLeftCorner: {
        position: "absolute",
        bottom: 0,
        left: 0,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
    },
    bottomRightCorner: {
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRightWidth: 4,
        borderBottomWidth: 4,
    },
    cornerStyle: {
        height: 20,
        width: 20,
        borderColor: "#fff"
    },
    topMask: {
        position: "absolute",
        top: 0,
        backgroundColor: "#0000004D",
        height: ( SCREEN_HEIGHT - 200 ) / 2
    },
    leftMask: {
        position: "absolute",
        left: 0,
        backgroundColor: "#0000004D",
        width: ( SCREEN_WIDTH - 200 ) / 2,
        height: 200
    },
    rightMask: {
        position: "absolute",
        right: 0,
        backgroundColor: "#0000004D",
        width: ( SCREEN_WIDTH - 200 ) / 2,
        height: 200
    },
    bottomMask: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#0000004D",
        height: ( SCREEN_HEIGHT - 200 ) / 2
    },
    scannerLineWrap: {
        height: 200,
        width: 200
    },
    scannerLine: {
        marginRight: 6,
        marginLeft: 6,
        height: 1.5,
        backgroundColor: "#fff"
    }
};