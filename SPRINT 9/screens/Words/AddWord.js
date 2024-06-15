import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { wordsLearningActions } from "../../store/wordsLearningSlice";
import { getWordInfo } from "../../services/wordsHandler";
import { playSound } from "../../services/soundHandler";
import { AddWordStyles } from "../../styles/AddWordStyles";
import { CustomButton } from "../../components/CustomButton";
import { Input } from "../../components/Input";

function AddWord({ navigation }) {
    const theme = useSelector((state) => state.theme.colors);
    const styles = AddWordStyles(theme);
    const dispatch = useDispatch();

    const [text, setText] = useState();
    const [wordData, setWordData] = useState();

    function onChangeText(text) {
        setWordData(undefined);
        setText(text);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (text) {
                const wordDataReceived = await getWordInfo(text);
                setWordData(wordDataReceived);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [text]);

    useEffect(() => {
        navigation.setOptions({
            title: wordData?.word ? `Adding word "${wordData.word}"` : `Adding word`,
        });
    }, [navigation, wordData]);

    function onAdd() {
        if (wordData)
            dispatch(wordsLearningActions.addWord(wordData));

        navigation.navigate(
            "AllWords"
        );
    }

    return (
        <>
            <Image
                style={styles.koala}
                source={require("../../assets/add-koala.png")}
            />
            <View style={styles.inputContainer}>
                <Input
                    label='Your word to search:'
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholderTextColor={theme.grey600}

                />
            </View>
            {wordData && (
                <View style={styles.receivedInfoContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                        <Text style={styles.phonetics}>{wordData.phonetics}</Text>
                    </View>
                    <Text style={styles.partOfSpeech}>{wordData.partOfSpeech}</Text>
                    <Text style={styles.meaning}>{wordData.meaning}</Text>
                    {wordData.word && (
                        <CustomButton
                            buttonStyle={styles.buttonContainer}
                            onPress={() => onAdd()}
                            buttonText="Add"
                            textStyle={{ fontSize: 24, color: theme.fontInverse }}
                        />
                    )}
                </View>
            )}
        </>
    );
}

export default AddWord;
