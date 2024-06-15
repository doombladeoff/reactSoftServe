import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { wordsLearningActions } from "../store/wordsLearningSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";
import { ListItemStyle } from "../styles/ListItemStyles";
import { CustomButton } from "./CustomButton";

function Item({ item }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.colors);
    const styles = ListItemStyle(theme);

    return (
        <View style={styles.item}>
            <Pressable disabled={!item.audio} onPress={() => playSound(item.audio)}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="play-outline"
                        size={28}
                        style={
                            !item.audio
                                ? { color: theme.grey300 }
                                : { color: theme.primary900 }
                        }
                    />
                </View>
            </Pressable>
            <CustomButton
                buttonStyle={styles.textContainer}
                onPress={() => navigation.navigate("EditWord", { wordData: item })}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>{item.word}</Text>
                    <Ionicons
                        name={`battery-${item.status == 0 ? "dead" : item.status == 1 ? "half" : "full"}-sharp`}
                        size={18}
                        color={theme.primary900}
                    />
                </View>
                <Text style={styles.definition}>{item.meaning}</Text>
            </CustomButton>
            <CustomButton
                buttonStyle={styles.iconContainer}
                onPress={() => dispatch(wordsLearningActions.removeWord(item.word))}
                iconName='trash-outline'
                iconSize={22}
                iconColor={theme.secondary800}

            />
        </View>
    );
}

export default Item;
