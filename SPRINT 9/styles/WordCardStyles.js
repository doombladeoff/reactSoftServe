import { StyleSheet } from "react-native";

export const WordCardStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        wordContainer: {
            flex: 4,
            borderColor: colors.primary200,
            margin: 10,
            borderWidth: 1,
            borderRadius: 4,
            alignItems: "center",
            paddingVertical: 140,
            justifyContent: "space-around",
        },
        word: {
            fontSize: 28,
            color: colors.fontMain,
            fontWeight: "800",
        },
        phonetics: {
            fontSize: 18,
            color: colors.fontMain,
        },
        meaning: {
            fontSize: 18,
            color: colors.fontMain,
        },
        remember: {
            flex: 1,
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
        },
        rememberText: {
            fontSize: 20,
            color: colors.fontInverse,
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: "row",
            marginBottom: 10,
        },
    });
}