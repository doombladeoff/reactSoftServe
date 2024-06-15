import { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Text,
    Image,
} from "react-native";
import { CustomButton } from "../components/Buttons/CustomButton";
import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";
import { styles } from "../styles/AddWordStyles";
import { COLORS } from "../constants";
import { PlaySoundButton } from "../components/Buttons/PlaySoundButton";

function AddWord({ route, navigation }) {
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
    }, [wordData]);

    const onAdd = () => {
        navigation.navigate("AllWords", { newWord: wordData });
    };

    return (
        <View style={{ backgroundColor: COLORS.appBackground, flex: 1 }}>
            <Image
                style={styles.image}
                source={require("../assets/add.png")}
            />
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Your word to search:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="type here.."
                    placeholderTextColor={COLORS.grey600}
                />
            </View>
            {wordData && (
                <View style={styles.receivedInfoContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.word}>{wordData?.word}</Text>
                        {wordData?.audio && (
                            <PlaySoundButton
                                onPress={() => playSound(wordData?.audio)}
                                iconName='volume-medium-outline'
                                setIconStyle={{ color: COLORS.primary900 }}
                                setPressableStyle={{ marginHorizontal: 20 }}
                            />
                        )}
                        <Text style={styles.phonetics}>{wordData?.phonetics}</Text>
                    </View>
                    <Text style={styles.partOfSpeech}>{wordData?.partOfSpeech}</Text>
                    <Text style={styles.meaning}>{wordData?.meaning}</Text>
                    {wordData?.word && (
                        <CustomButton buttonText='Add' onPress={() => onAdd()}/>
                    )}
                </View>
            )}
        </View>
    );
}

export default AddWord;
