import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.appBackground
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: COLORS.grey600,
        borderRadius: 5,
        zIndex: 0
    },
    cardTitle: {
        color: COLORS.fontMain,
        fontSize: 24
    },
    wordDataContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 30,
        zIndex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})