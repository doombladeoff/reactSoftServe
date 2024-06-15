import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#ffffff",
        alignSelf: "center",
        width: "100%",
        maxWidth: 600,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cccccc",
        padding: 10,
        borderRadius: 4,
    },
    button: {
        backgroundColor: "#0056b3",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    formHeader: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#0056b3",
        marginBottom: 20,
        marginTop: 20,
    },
    formTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0056b3",
        marginBottom: 10,
        marginTop: 20,
    },
    errorText: {
        color: "red",
    },
})