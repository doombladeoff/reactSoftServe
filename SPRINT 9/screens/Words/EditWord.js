import { useState } from "react";
import { View, Text, Image } from "react-native";
import { playSound } from "../../services/soundHandler";
import { useDispatch, useSelector } from "react-redux";
import { wordsLearningActions } from "../../store/wordsLearningSlice";
import { EditWordStyle } from "../../styles/EditWordStyles";
import { CustomButton } from "../../components/CustomButton";
import { Input } from "../../components/Input";

function EditWord({ route, navigation }) {
    const [wordData, setWordData] = useState(() => route.params.wordData);

    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.colors);
    const styles = EditWordStyle(theme);

    function onSave() {
        dispatch(wordsLearningActions.updateWord(wordData));
        navigation.navigate("AllWords");
    }

    function onChangeWordData(text, propName) {
        setWordData((prevData) => ({ ...prevData, [propName]: text }));
    }

    return (
        <>
            <Image
                style={styles.koala}
                source={require("../../assets/edit-koala.png")}
            />
            <View style={styles.receivedInfoContainer}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                    <Text style={styles.word}>{wordData.word}</Text>
                    {wordData.audio && (
                        <CustomButton
                            buttonStyle={styles.playPressable}
                            onPress={() => playSound(wordData.audio)}
                            iconName="volume-medium-outline"
                            iconSize={28}
                            iconColor={theme.primary900}
                        />
                    )}
                </View>
                <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Input
                            label="phonetics:"
                            labelStyle={styles.label}
                            value={wordData.phonetics}
                            inputStyle={styles.input}
                            onChangeText={(text) => onChangeWordData(text, "phonetics")}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            label="part of speech:"
                            labelStyle={styles.label}
                            value={wordData.partOfSpeech}
                            inputStyle={styles.input}
                            onChangeText={(text) => onChangeWordData(text, "partOfSpeech")}
                        />
                    </View>
                </View>
                <Input
                    label="meaning:"
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    multiLine
                    numberOfLines={4}
                    onChangeText={(text) => onChangeWordData(text, "meaning")}
                    value={wordData.meaning}
                    textAlignVertical={"top"}
                />
                {wordData.word && (
                    <CustomButton
                        buttonStyle={styles.buttonContainer}
                        onPress={onSave}
                        textStyle={{ fontSize: 24, color: theme.fontInverse }}
                        buttonText="Save"
                    />
                )}
            </View>
        </>
    );
}

export default EditWord;
