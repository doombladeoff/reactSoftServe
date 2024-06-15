import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const PlaySoundButton = ({ onPress, disabled, setPressableStyle, iconName, setIconStyle }) => {
    return (
        <Pressable
            disabled={disabled ? true : false}
            style={setPressableStyle ? setPressableStyle : null}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name={iconName}
                    size={28}
                    style={setIconStyle}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        padding: 3,
        borderRadius: 20,
    },
})