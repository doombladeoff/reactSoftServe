import { StyleSheet, Dimensions } from "react-native";

export const landscapeStyle = StyleSheet.create({
    appContainer: {
        flexDirection: "row",
        marginRight: 50,
        height: Dimensions.get("window").height,
        paddingVertical: 30,
    },
    header: {
        flexDirection: "column",
        width: "20%",
        justifyContent: "space-between",
    },
    headerItemContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    image: {
        height: 80,
        width: "100%",
        resizeMode: "contain",
    },
    main: {
        height: "100%",
        width: "85%",
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
    }
});
