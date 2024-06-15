import { StyleSheet, Platform } from "react-native";

const ANDROID_BACKGROUND_COLOR = "#FFFFE0";
const IOS_BACKGROUND_COLOR = "#B0E0E6";

export const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor:
            Platform.OS === "ios" ? IOS_BACKGROUND_COLOR : ANDROID_BACKGROUND_COLOR,
    },
    header: {
        backgroundColor: "#D8BFD8",
        padding: 8,
        borderWidth: 1,
        borderColor: "green",
    },
    headerItem: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#00008B",
    },
    headerText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#00008B",
        marginTop: 15,
        marginBottom: 10,
    },
    inputContainer: {
        alignItems: "center",
        paddingBottom: 28,
        marginBottom: 18,
        borderBottomWidth: 2,
        borderBottomColor: "#DDA0DD",
    },
    textInput: {
        borderWidth: 2,
        height: 150,
        fontSize: 18,
        padding: 8,
        textAlignVertical: "top",
    },
    button: {
        height: 50,
        borderWidth: 2,
        marginTop: 20,
        backgroundColor: "#DDA0DD",
        justifyContent: "center",
        borderRadius: 12,
    },
    buttonText: {
        height: 30,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#00008B",
    },
    feedbackShadow: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5
    },
    feedbackItem: {
        margin: 8,
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#E6E6FA",
        fontSize: 20,
        fontWeight: "500",
        color: "black",
        borderWidth: 2,
        overflow: "hidden",
    },
});
