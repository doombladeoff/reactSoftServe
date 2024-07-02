import { View, Text, StyleSheet, Image } from "react-native";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectWordsToLearn } from "../../store/wordsLearningSlice";
import WordCard from "../../components/WordCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Deck from "../../components/Deck";

export default function Play() {
    const wordsToStudy = useSelector(selectWordsToLearn);
    const colors = useSelector((state) => state.theme.colors);
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {wordsToStudy.length === 0 ? (
                    <>
                        <Text style={[styles.text, { alignSelf: "center" }]}>Congrats!</Text>
                        <Text style={styles.text}>For now you have learnt all the words</Text>
                        <Image style={styles.image} source={require("../../assets/well-done-icon.png")}/>
                    </>
                ) : (
                    <>
                        <Deck cardCount={wordsToStudy.length}/>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {wordsToStudy.map((word, index) => {
                                return (
                                    <WordCard
                                        key={word.word}
                                        zIndexCard={1000 + index}
                                        wordInfo={wordsToStudy[index % wordsToStudy.length]}
                                    />
                                )
                            })}
                        </View>
                    </>
                )}
            </View>
        </GestureHandlerRootView>
    );
}

function getStyles(colors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.appBackground,
        },
        text: {
            color: colors.fontMain,
            fontSize: 22,
            margin: 10,
            marginTop: 25,
        },
        image: {
            width: "100%",
            height: undefined,
            aspectRatio: 1,
            alignSelf: "center",
            resizeMode: "contain",
        },
    });
}
