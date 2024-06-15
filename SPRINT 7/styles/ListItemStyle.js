import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const styles = StyleSheet.create({
    item: {
        zIndex: -10,
        backgroundColor: COLORS.black,
        flexDirection: "row",
        marginVertical: 6,
        marginHorizontal: 5,
        alignItems: "center",
        paddingHorizontal: 5,
        borderRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.white,
    },
    definition: {
        fontSize: 16,
        color: COLORS.white,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 5,
    },
})