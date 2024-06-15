import { StyleSheet } from "react-native";

export const EditWordStyle = (colors) => {
    return StyleSheet.create({
        koala: {
            width: "40%",
            marginTop: 80,
            marginBottom: 20,
            height: undefined,
            aspectRatio: 1,
            alignSelf: "center",
            resizeMode: "contain",
        },
        input: {
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 6,
            borderColor: colors.primary200,
            color: colors.fontMain,
        },
        label: {
            fontSize: 12,
            color: colors.grey600,
            marginBottom: 4,
            paddingTop: 10,
        },
        inputContainer: {
            margin: 12,
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
        },
        partOfSpeech: {
            fontSize: 20,
            paddingHorizontal: 10,
        },
        meaning: {
            fontSize: 16,
            padding: 13,
        },
        buttonContainer: {
            borderRadius: 4,
            backgroundColor: colors.primary900,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 14,
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
    });
}