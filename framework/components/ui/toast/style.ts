import { Platform } from "react-native";

export const style: any = {
    toast: {
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: Platform.OS === "ios" ? 5 : 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        minHeight: 50,
    },
    text: {
        color: "#fff",
        flex: 1
    },
    button: {
        backgroundColor: "transparent",
        height: 30,
        elevation: 0,
    },
    buttonText: {
        fontSize: 14
    }
};