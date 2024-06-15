import { StyleSheet, Dimensions } from "react-native";

export const portraitStyle = StyleSheet.create({
    appContainer: {
        paddingTop: 20,
        paddingHorizontal: 16,
        justifyContent: "space-around",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    main: {
        height: "95%",
        width: "100%",
    },
});
