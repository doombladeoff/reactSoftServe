import { Pressable, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { playSound } from "../../services/soundHandler";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Card = ({ word }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{word.phonetics}</Text>
            <Pressable onPress={() => playSound(word.audio)}>
                <Ionicons name='volume-medium-outline' size={28} color={COLORS.primary900}/>
            </Pressable>
            <Text style={styles.text}>{word.meaning}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: "column",
        gap: 25,
        alignItems: "center",
    },
    text: {
        color: COLORS.fontMain,
        fontSize: 24
    }
})