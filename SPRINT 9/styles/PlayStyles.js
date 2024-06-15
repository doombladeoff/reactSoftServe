import { StyleSheet } from "react-native";

export const PlayStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.appBackground,
        },
        text: {
            color: colors.fontMain,
            fontSize: 22,
            margin: 10,
            marginTop: 25,
        },
        image: {
            width: "100%",
            height: undefined,
            aspectRatio: 1,
            alignSelf: "center",
            resizeMode: "contain",
        },
    });
}