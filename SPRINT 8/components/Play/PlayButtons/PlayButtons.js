import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from '../../../constants';

export const PlayButtons = ({ text, onPress, buttonColor }) => {
    return (
        <Pressable
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.fontMain, fontWeight: 'bold' }}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 180,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})