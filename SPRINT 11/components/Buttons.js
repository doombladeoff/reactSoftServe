import { Pressable, Text, StyleSheet } from "react-native";

export const Buttons = ({ onPress, textButton }) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{textButton}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#88cff1',
        padding: 15,
        borderRadius: 10,
        width: 170,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1.2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})