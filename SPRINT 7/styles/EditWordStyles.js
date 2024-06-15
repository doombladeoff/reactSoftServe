import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: COLORS.appBackground,
        paddingHorizontal: 15
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 4,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 30
    },
    text: {
        fontSize: 16,
        color: COLORS.white
    },
    textInput: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.grey600,
        padding: 10,
        marginVertical: 5,
        color: COLORS.white
    },
})