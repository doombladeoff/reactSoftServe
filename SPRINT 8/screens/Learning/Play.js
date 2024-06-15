import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "../../components/Play/Card";
import { PlayButtons } from "../../components/Play/PlayButtons/PlayButtons";
import MyWords from "../../tests/testData";
import { COLORS } from "../../constants";
import { styles } from "../../styles/PlayScreenStyles";

export default function Play({ words = MyWords }) {
    const [learnWords, setWordsData] = useState({
        words: words,
        allWordsLearned: false,
        isShowData: false,
    });
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const onShowWordData = () => setWordsData(prevState => ({ ...prevState, isShowData: !prevState.isShowData }));

    const handleNextIndex = () => {
        setCurrentWordIndex((prevIndex) => {
            let nextIndex = (prevIndex + 1) % learnWords.words.length;
            while (learnWords.words[nextIndex].status === 2 && nextIndex !== prevIndex) {
                nextIndex = (nextIndex + 1) % learnWords.words.length;
            }
            return nextIndex;
        });
    };

    const handleStatusChange = (status, type) => {
        onShowWordData();
        setWordsData(prevState => {
            const updatedWords = [...prevState.words];

            if (type === 'next' && updatedWords[currentWordIndex].status === 0) {
                updatedWords[currentWordIndex].status = status;
            } else if (type === 'remember') {
                updatedWords[currentWordIndex].status += status;
            }
            return { ...prevState, words: updatedWords };
        });
    };

    const handlePress = (status, type) => {
        handleNextIndex();
        handleStatusChange(status, type);
    };

    useEffect(() => {
        const checkAllWordsLearned = () => learnWords.words.every(word => word.status === 2);
        if (checkAllWordsLearned())
            setWordsData(prevState => ({ ...prevState, allWordsLearned: true }));
    }, [learnWords.words]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, padding: 8 }}>
                {!learnWords.allWordsLearned ? (
                    <>
                        <Pressable onPress={() => onShowWordData()} style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>{learnWords.words[currentWordIndex].word}</Text>
                            {learnWords.isShowData && <Card word={learnWords.words[currentWordIndex]}/>}
                        </Pressable>

                        {learnWords.isShowData && (
                            <View style={styles.buttonContainer}>
                                <PlayButtons
                                    text={`Didn't know it`}
                                    buttonColor={COLORS.secondary800}
                                    onPress={() => {
                                        handlePress(0, 'next');
                                    }}
                                />
                                <PlayButtons
                                    text={`Knew it`}
                                    buttonColor={COLORS.primary900}
                                    onPress={() => {
                                        handlePress(1, 'remember');
                                    }}
                                />
                            </View>
                        )}
                    </>
                ) : (
                    <View style={styles.completedContainer}>
                        <Text style={{ color: COLORS.fontMain, fontSize: 24 }}>Congrats!</Text>
                        <Text style={{ color: COLORS.fontMain, fontSize: 20 }}>
                            For now you have learned all the words
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}