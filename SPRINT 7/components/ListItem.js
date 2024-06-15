import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";
import { styles } from "../styles/ListItemStyle";
import { COLORS } from "../constants";
import { PlaySoundButton } from "./Buttons/PlaySoundButton";

export default Item = ({ item, onDelete }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.item}>
            <PlaySoundButton
                onPress={() => playSound(item.audio)}
                disabled={!item.audio}
                iconName='play-outline'
                setIconStyle={!item.audio
                    ? { color: COLORS.grey300 }
                    : { color: COLORS.primary900 }}
            />
            <Pressable
                style={styles.textContainer}
                onPress={() => navigation.navigate("EditWord", { wordData: item })}
            >
                <Text style={styles.title}>{item.word}</Text>
                <Text style={styles.definition}>{item.meaning}</Text>
            </Pressable>
            <Pressable
                style={styles.iconContainer}
                onPress={() => onDelete(item.word)}
            >
                <Ionicons name="trash-outline" size={22} color={COLORS.secondary800}/>
            </Pressable>
        </View>
    );
};