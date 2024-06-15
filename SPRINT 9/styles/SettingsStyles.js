import { StyleSheet } from "react-native";

export const SettingsStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.appBackground
        },
        switchContainer: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 100,
        },
        caption: {
            fontSize: 18,
            margin: 30,
            color: colors.fontMain
        },
    });
}