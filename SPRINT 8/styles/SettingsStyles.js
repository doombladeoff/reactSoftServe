import { StyleSheet } from "react-native";
import { COLORS, COLORS_LIGHT } from "../constants";

export const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: COLORS.appBackground,
    },
    textInverse: {
        color: COLORS_LIGHT.fontInverse
    },
    text: {
        color: COLORS.fontMain
    },
});

export const lightTheme = StyleSheet.create({
    container: {
        backgroundColor: COLORS_LIGHT.appBackground,
    },
    textInverse: {
        color: COLORS.fontInverse
    },
    text: {
        color: COLORS_LIGHT.fontMain
    },
});