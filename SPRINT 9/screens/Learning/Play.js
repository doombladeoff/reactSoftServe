import { View, Text, Image } from "react-native";
import { useState } from "react";
import WordCard from "../../components/WordCard";
import { useSelector } from "react-redux";
import { PlayStyle } from "../../styles/PlayStyles";

export default function Play() {
    const wordsToStudy = useSelector((state) => state.wordsLearning.words);
    const theme = useSelector((state) => state.theme.colors);
    const styles = PlayStyle(theme);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    return (
        <View style={styles.container}>
            {wordsToStudy.every(word => word.status === 2) ? (
                <>
                    <Text style={{ ...styles.text, alignSelf: "center" }}>Congrats!</Text>
                    <Text style={styles.text}>For now you have learnt all the words</Text>
                    <Image
                        style={styles.image}
                        source={require("../../assets/well-done-icon.png")}
                    />
                </>
            ) : (
                <WordCard
                    wordInfo={wordsToStudy[currentWordIndex % wordsToStudy.length]}
                    setNext={() =>
                        setCurrentWordIndex(
                            (currentWordIndex) => (currentWordIndex + 1) % wordsToStudy.length
                        )
                    }
                />
            )}
        </View>
    );
}