import { StyleSheet } from "react-native";

export const AddWordStyles = (colors) => {
    return StyleSheet.create({
        koala: {
            marginTop: 80,
            marginBottom: 20,
            width: "40%",
            height: undefined,
            aspectRatio: 1,
            alignSelf: "center",
            resizeMode: "contain",
        },
        input: {
            height: 40,
            fontSize: 18,
            borderColor: colors.primary200,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            color: colors.fontMain,
        },
        label: {
            fontSize: 12,
            color: colors.grey600,
            marginBottom: 4,
        },
        inputContainer: {
            marginHorizontal: 12,
        },
        receivedInfoContainer: {
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
        },
        word: {
            fontSize: 32,
            paddingHorizontal: 10,
            color: colors.fontMain,
        },
        phonetics: {
            fontSize: 20,
            paddingHorizontal: 10,
            color: colors.fontMain,
        },
        partOfSpeech: {
            fontSize: 20,
            paddingHorizontal: 10,
            color: colors.fontMain,
        },
        meaning: {
            fontSize: 16,
            padding: 13,
            color: colors.fontMain,
        },
        buttonContainer: {
            borderRadius: 4,
            backgroundColor: colors.primary900,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
        },
        backPressable: {
            position: "absolute",
            width: 60,
            borderRadius: 30,
            aspectRatio: 1,
            top: "2%",
            left: "2%",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
        },
        playPressable: {
            marginHorizontal: 20,
        },
    })
}