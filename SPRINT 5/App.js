import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    Alert,
    TextInput,
    Pressable,
    useWindowDimensions, KeyboardAvoidingView, Platform, Keyboard,
} from "react-native";
import { useState } from "react";

import { styles } from "./styles/defaultStyles";
import { landscapeStyle } from "./styles/landScape";
import { portraitStyle } from "./styles/portrait";

export default function App() {
    const { width } = useWindowDimensions();
    const isLandscape = width > 430;

    const [enteredFeedback, setEnteredFeedback] = useState("");
    const [feedbackCollection, setFeedbackCollection] = useState([]);

    function feedbackInputHandler(enteredText) {
        setEnteredFeedback(enteredText);
    }

    function addFeedbackHandler() {
        if (enteredFeedback.trim() === "") return;

        setFeedbackCollection((curFeedbackCollection) => [
            ...curFeedbackCollection,
            enteredFeedback,
        ]);
        setEnteredFeedback("");
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={isLandscape ? landscapeStyle.appContainer : portraitStyle.appContainer}>
                <View style={[
                    styles.header,
                    isLandscape ? landscapeStyle.header : portraitStyle.header,
                ]}
                >
                    <View style={isLandscape ? null : landscapeStyle.headerItemContainer}>
                        <Pressable onPress={() => Alert.alert("Go to Home!")}>
                            <Text style={styles.headerItem}>Home</Text>
                        </Pressable>
                        <Pressable onPress={() => Alert.alert("Go to Catalog!")}>
                            <Text style={styles.headerItem}>Catalog</Text>
                        </Pressable>
                        <Pressable onPress={() => Alert.alert("Go to Order!")}>
                            <Text style={styles.headerItem}>Order</Text>
                        </Pressable>
                    </View>

                    {isLandscape && (
                        <View>
                            <Image
                                source={require("./assets/Feedback_Icon.png")}
                                style={landscapeStyle.image}
                            />
                        </View>
                    )}
                </View>
                <View style={isLandscape ? landscapeStyle.main : portraitStyle.main}>
                    <Text
                        style={[
                            styles.headerText,
                            {
                                textAlign: isLandscape ? "center" : "left",
                            },
                        ]}
                    >
                        Feedback form
                    </Text>
                    <View
                        style={[
                            styles.inputContainer,
                            isLandscape
                                ? landscapeStyle.inputContainer
                                : { flexDirection: "column" },
                        ]}
                    >
                        <TextInput
                            editable
                            multiline
                            numberOfLines={6}
                            maxLength={500}
                            style={[
                                styles.textInput,
                                isLandscape ? { width: "60%" } : { width: "90%" },
                            ]}
                            placeholder="Enter your comment"
                            onChangeText={feedbackInputHandler}
                            value={enteredFeedback}
                        />
                        <Pressable
                            style={[
                                styles.button,
                                isLandscape ? { width: "35%", top: 40 } : { width: "90%" },
                            ]}
                            onPress={addFeedbackHandler}
                        >
                            <Text style={styles.buttonText}>Add feedback</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        {feedbackCollection.map((feedback) => (
                            <Pressable key={feedback} style={styles.feedbackShadow}>
                                <Text style={styles.feedbackItem}>{feedback}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}
