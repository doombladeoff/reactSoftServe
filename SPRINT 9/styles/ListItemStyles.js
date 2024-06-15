import { StyleSheet } from "react-native";

export const ListItemStyle = (colors) => {
    return StyleSheet.create({
        item: {
            zIndex: -10,
            backgroundColor: colors.fontInverse,
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
            color: colors.fontMain,
            paddingRight: 20,
        },
        definition: {
            fontSize: 16,
            color: colors.fontMain,
        },
        iconContainer: {
            padding: 3,
            borderRadius: 20,
        },
        textContainer: {
            flex: 1,
            paddingLeft: 10,
            paddingBottom: 5,
        },
    });
}