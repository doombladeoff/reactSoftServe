import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const CustomButton = ({ buttonText, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.buttonContainer}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 5,
        backgroundColor: COLORS.primary900,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    buttonText: {
        fontSize: 24,
        color: COLORS.white
    }
})