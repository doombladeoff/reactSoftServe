import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const styles = StyleSheet.create({
    image: {
        marginTop: 100,
        marginBottom: 30,
        width: "20%",
        height: undefined,
        aspectRatio: 1,
        alignSelf: "center",
        resizeMode: "contain",
    },
    input: {
        height: 40,
        fontSize: 18,
        borderColor: COLORS.primary200,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: COLORS.white,
    },
    label: {
        fontSize: 12,
        color: COLORS.grey600,
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
        color: COLORS.white,
    },
    phonetics: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: COLORS.white,
    },
    partOfSpeech: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: COLORS.white,
    },
    meaning: {
        fontSize: 16,
        padding: 13,
        color: COLORS.white,
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
})