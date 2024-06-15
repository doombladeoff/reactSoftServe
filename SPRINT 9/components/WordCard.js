import { useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { wordsLearningActions } from "../store/wordsLearningSlice";
import { playSound } from "../services/soundHandler";
import { COLORS_DARK } from "../constants";
import { WordCardStyle } from "../styles/WordCardStyles";
import { CustomButton } from "./CustomButton";

function WordCard({ wordInfo, setNext }) {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const theme = useSelector((state) => state.theme.colors);
    const styles = WordCardStyle(theme);

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <CustomButton
                buttonText={wordInfo.word}
                textStyle={styles.word}
                buttonStyle={styles.wordContainer}
                onPress={() => setShowFullInfo(true)}
            >
                {showFullInfo && (
                    <>
                        <Text style={styles.phonetics}>{wordInfo.phonetics}</Text>
                        <CustomButton
                            buttonStyle={styles.playPressable}
                            onPress={() => playSound(wordInfo.audio)}
                            iconName="volume-medium-outline"
                            iconSize={28}
                            iconColor={theme.primary900}
                        />
                        <Text style={styles.meaning}>{wordInfo.meaning}</Text>
                    </>
                )}
            </CustomButton>
            {showFullInfo && (
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        buttonText={`Didn't know it`}
                        textStyle={styles.rememberText}
                        onPress={() => {
                            setNext();
                            setShowFullInfo(false);
                        }}
                        buttonStyle={({ pressed }) => [
                            styles.remember,
                            {
                                backgroundColor: COLORS_DARK.secondary800,
                                opacity: pressed ? 0.7 : 1,
                            },
                        ]}
                    />
                    <CustomButton
                        buttonText={`Knew it`}
                        textStyle={styles.rememberText}
                        onPress={() => {
                            dispatch(wordsLearningActions.updateWordLearnInfo(wordInfo.word));
                            setShowFullInfo(false);
                            setNext();
                        }}
                        buttonStyle={({ pressed }) => [
                            styles.remember,
                            {
                                backgroundColor: COLORS_DARK.primary900,
                                opacity: pressed ? 0.7 : 1,
                            },
                        ]}
                    />
                </View>
            )}
        </View>
    );
}

export default WordCard;
