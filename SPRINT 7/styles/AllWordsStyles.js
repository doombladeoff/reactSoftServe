import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const styles = StyleSheet.create({
    imageContainer: {
        height: 220,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        zIndex: 10,
    },
    addPressable: {
        position: "absolute",
        width: 60,
        borderRadius: 30,
        aspectRatio: 1,
        top: 210,
        right: "10%",
        backgroundColor: COLORS.primary900,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        elevation: 5,
    },
    image: {
        width: "45%",
        height: undefined,
        aspectRatio: 1,
        alignSelf: "center",
        resizeMode: "contain",
    },
    empty: {
        height: 300,
        backgroundColor: COLORS.appBackground,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    textEmpty: {
        fontSize: 40,
        color: COLORS.primary200,
    },
})