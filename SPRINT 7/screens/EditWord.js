import { useEffect, useState } from "react";
import { Text, View, Image, Pressable, TextInput } from 'react-native';
import { styles } from "../styles/EditWordStyles";
import { COLORS } from "../constants";
import { playSound } from "../services/soundHandler";
import { CustomButton } from "../components/Buttons/CustomButton";
import { PlaySoundButton } from "../components/Buttons/PlaySoundButton";
import { InputField } from "../components/InputField";

export default function EditWord({ route, navigation }) {
    const item = route.params.wordData;
    const [editWord, setEditWord] = useState(item);

    // useEffect(() => {
    //     navigation.setOptions({
    //         title: `Editing word "${route.params.wordData?.word}"`,
    //     });
    // }, [navigation]);

    const onChangeText = (key, text) => {
        setEditWord(prevState => ({
            ...prevState,
            [key]: text
        }));
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/edit.png')} style={styles.image}/>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.text, { fontWeight: 'bold', fontSize: 20 }]}>{editWord.word}</Text>
                {item?.audio && (
                    <PlaySoundButton
                        onPress={() => playSound(item.audio)}
                        iconName='volume-medium-outline'
                        setIconStyle={{ color: COLORS.primary900 }}
                        setPressableStyle={{ marginHorizontal: 20 }}
                    />
                )}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <InputField
                        fieldName='phonetics'
                        textKey='phonetics'
                        value={editWord.phonetics}
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <InputField
                        fieldName='part of speech'
                        textKey='partOfSpeech'
                        value={editWord.partOfSpeech}
                        onChangeText={onChangeText}
                    />
                </View>
            </View>
            <InputField
                fieldName='meaning'
                textKey='meaning'
                value={editWord.meaning}
                onChangeText={onChangeText}
                multiline={true}
            />
            <CustomButton buttonText='Save' onPress={() => navigation.navigate("AllWords", { editWord: editWord })}/>
        </View>
    );
}
