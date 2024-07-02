import React, { useCallback } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedProps,
    useDerivedValue,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

import Svg, { Circle } from "react-native-svg";

const BACKGROUND_COLOR = "#F0EBED";
const BACKGROUND_STROKE_COLOR = "#f4b7d7";
const BACKGROUND_BUTTON_COLOR = "#c00069";
const BACKGROUND_BUTTON_PRESSED_COLOR = "#A3025A";
const STROKE_COLOR = "#e91f8b";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

export default function App() {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const progress = useSharedValue(0);
    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [progress.value * CIRCLE_LENGTH, (1 - progress.value) * CIRCLE_LENGTH],
    }));

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}`;
    });

    const startAnimation = useCallback(() => {
        progress.value = withTiming(progress.value === 0 ? 1 : 0, { duration: 2000 });
    }, [progress.value]);


    return (
        <View style={styles.container}>
            <Svg style={{ position: "absolute" }}>
                <Circle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke={BACKGROUND_STROKE_COLOR}
                    strokeWidth={30}
                />
                <AnimatedCircle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke={STROKE_COLOR}
                    strokeWidth={25}
                    strokeDashoffset={250}
                    animatedProps={animatedProps}
                    strokeLinecap={"butt"}
                    fill={BACKGROUND_COLOR}
                />
            </Svg>
            <ReText
                style={styles.progressText}
                text={progressText}
            />
            <Pressable
                onPress={startAnimation}
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed
                            ? BACKGROUND_BUTTON_PRESSED_COLOR
                            : BACKGROUND_BUTTON_COLOR,
                    },
                ]}
            >
                <Text style={styles.buttonText}>Run</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: "center",
        justifyContent: "center",
    },
    progressText: {
        fontSize: 80,
        color: "#3C3B3B",
        width: 200,
        textAlign: "center",
    },
    button: {
        position: "absolute",
        bottom: 80,
        width: width * 0.7,
        height: 60,
        borderRadius: 15,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 25,
        color: "white",
        letterSpacing: 2.0,
    },
});
