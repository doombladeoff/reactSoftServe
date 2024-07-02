import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wordsLearningActions } from "../store/wordsLearningSlice";
import { playSound } from "../services/soundHandler";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue, withSequence,
    withSpring
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

function WordCard({ wordInfo, zIndexCard }) {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const colors = useSelector((state) => state.theme.colors);
    const styles = useMemo(() => getStyles(colors), [colors]);
    const dispatch = useDispatch();

    const learnWord = () => dispatch(wordsLearningActions.updateWordLearnInfo(wordInfo.word));

    const screenWidth = Dimensions.get('window').width / 2.3;
    const zIndex = useSharedValue(zIndexCard);

    const [counter, setCounter] = useState(0);
    const handleCounter = () => setCounter(counter - 1);

    const translateX = useSharedValue(0);
    const rotateY = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { rotateY: `${rotateY.value}deg` },
            { rotateZ: `${translateX.value / 10}deg` },
        ],
        zIndex: zIndex.value
    }));

    const handleShowFullInfo = () => setTimeout(() => setShowFullInfo(true), 150);
    const tap = Gesture.Tap()
        .numberOfTaps(1)
        .onBegin(() => {
            zIndex.value = 2000;
            rotateY.value = withSpring(180, { duration: 5000 });
            runOnJS(handleShowFullInfo)();
        });
    const pan = Gesture.Pan()
        .onChange((e) => {
            translateX.value = e.translationX;
        })
        .onFinalize((e) => {
            if (showFullInfo) {
                if (Math.abs(e.translationX) < screenWidth) {
                    translateX.value = withSpring(0);
                } else if (e.translationX < -100) {
                    translateX.value = withSequence(
                        withSpring(-400, { duration: 700 }, () => {
                            rotateY.value = 0;
                            zIndex.value = -1000 + counter;
                            runOnJS(handleCounter)();
                        }),
                        withSpring(0)
                    );
                    runOnJS(setShowFullInfo)(false);
                } else if (e.translationX > 100) {
                    translateX.value = withSpring(1000, {}, () => {
                        rotateY.value = 0;
                    });
                    runOnJS(learnWord)();
                    runOnJS(setShowFullInfo)(false);
                }
            }
        });

    const knewItAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, 100], [0, 1])
    }));
    const learnAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [-100, 0], [1, 0])
    }));

    return (
        <GestureDetector gesture={Gesture.Race(pan, tap)}>
            <Animated.View style={[animatedStyles, styles.container]}>
                <View style={styles.wordContainer}>
                    <Animated.View style={[styles.knewIt, knewItAnimatedStyles]}>
                        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}>I know it</Text>
                    </Animated.View>
                    <Animated.View style={[styles.learnWord, learnAnimatedStyles]}>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Learn again</Text>
                    </Animated.View>
                    {!showFullInfo && (<Text style={styles.word}>{wordInfo.word}</Text>)}
                    <View style={{
                        alignItems: "center",
                        transform: [{ rotateY: `180deg` }],
                    }}
                    >
                        {showFullInfo && wordInfo.image && (
                            <Image
                                style={styles.image}
                                source={{ uri: wordInfo.image }}
                            />
                        )}
                        {showFullInfo && (
                            <>
                                <Text style={styles.word}>{wordInfo.word}</Text>
                                <Text style={styles.phonetics}>{wordInfo.phonetics}</Text>
                                <Pressable
                                    style={styles.playPressable}
                                    onPress={() => playSound(wordInfo.audio)}
                                >
                                    <Ionicons
                                        name="volume-medium-outline"
                                        size={28}
                                        color={colors.primary900}
                                    />
                                </Pressable>
                                <Text style={styles.meaning}>{wordInfo.meaning}</Text>
                            </>
                        )}
                    </View>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}

function getStyles(colors) {
    return StyleSheet.create({
        container: {
            position: "absolute",
            width: Dimensions.get('window').width / 1.4,
            height: Dimensions.get('window').height / 1.4,
        },
        wordContainer: {
            flex: 4,
            borderColor: colors.primary200,
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor: colors.appBackground,
            alignItems: "center",
            justifyContent: "center",
        },
        word: {
            fontSize: 28,
            color: colors.fontMain,
            fontWeight: "800",
            paddingVertical: 15,
        },
        playPressable: {
            paddingVertical: 15,
        },
        phonetics: {
            fontSize: 18,
            color: colors.fontMain,
            paddingVertical: 15,
        },
        meaning: {
            fontSize: 18,
            color: colors.fontMain,
            padding: 5
        },
        remember: {
            flex: 1,
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
        },
        rememberText: {
            fontSize: 20,
            color: colors.fontInverse,
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: "row",
            marginBottom: 10,
        },
        image: {
            width: 150,
            aspectRatio: 1,
        },
        learnWord: {
            borderRadius: 10,
            borderColor: 'red',
            borderWidth: 1,
            padding: 10,
            position: 'absolute',
            top: 35,
            left: 0,
            transform: [{ rotateZ: '-45deg' }, { rotateY: '180deg' }]
        },
        knewIt: {
            borderRadius: 10,
            borderColor: 'green',
            borderWidth: 1,
            padding: 10,
            position: 'absolute',
            top: 25,
            right: 0,
            transform: [{ rotateZ: '45deg' }, { rotateY: '180deg' }]
        },
    });
}

export default WordCard;
