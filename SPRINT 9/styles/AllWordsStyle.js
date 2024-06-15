import { StyleSheet } from "react-native";

export const AllWordsStyle = (colors) => {
    return StyleSheet.create({
        imageContainer: {
            height: 220,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 5,
            zIndex: 10,
        },
        addPressable: {
            position: "absolute",
            width: 60,
            borderRadius: 30,
            aspectRatio: 1,
            top: 200,
            right: "10%",
            backgroundColor: colors.primary900,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            elevation: 5,
        },
        image: {
            width: "55%",
            height: undefined,
            aspectRatio: 1,
            alignSelf: "center",
            resizeMode: "contain",
        },
        empty: {
            height: 300,
            backgroundColor: colors.fontInverse,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
        },
        textEmpty: {
            fontSize: 40,
            color: colors.primary200,
        },
    });
}