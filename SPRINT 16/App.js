import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import uuid from "react-native-uuid";
import Countdown from "./components/Countdown";
import { services } from "./services/notifications";
import * as Notifications from "expo-notifications";

// ----- setup the notifications to works on the device here
async function setupNotifications() {
    try {
        await services.setup();
    } catch (error) {
        console.log('Error in setupNotifications:', error);
    }
};

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [text, setText] = useState("");
    const [emoji, setEmoji] = useState("");
    const [inputDate, setDate] = useState(new Date());

    useEffect(() => {
        async function setup() {
            await setupNotifications();
            const subscription = await Notifications.addNotificationResponseReceivedListener(response => {
                const { actionIdentifier, notification } = response;
                if (actionIdentifier === 'delete') {
                    const { id } = notification.request.content.data;
                    deleteFromList(id).then(() => console.log(`delete item ${id}`));
                }
            });

            return () => subscription.remove();
        }

        setup();

    }, []);

    const handleInputChange = (value) => {
        setInputValue(value);
        separateTextAndEmoji(value);
    };

    const separateTextAndEmoji = (value) => {
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
        const match = value.match(emojiRegex);
        const emojiPart = match ? match.join('') : '';
        const textPart = value.replace(emojiRegex, "").trim();
        setText(textPart);
        setEmoji(emojiPart);
    };

    const addToList = async () => {
        if (inputValue === "") {
            Alert.alert("Oops", "Input is empty", [{ text: "Ok" }]);
            return;
        }
        if (inputDate < new Date()) {
            Alert.alert("Oops", "Date must be future", [{ text: "Ok" }]);
            return;
        }

        const newItem = {
            id: uuid.v4(),
            title: text,
            emoji: emoji || "⏳", // ----- change the countdown icon here
            date: inputDate,
            notificationId: null
        };

        // ----- schedule the countdown notification here
        const getTriggerTime = ((inputDate.getTime() - new Date().getTime()) / 1000).toFixed(0);
        newItem.notificationId = await services.schedule(newItem.title, 'Countdown completed!', { id: newItem.id }, parseInt(getTriggerTime));

        setTasks([newItem, ...tasks]);
        setInputValue("");
        setDate(new Date());
        Keyboard.dismiss();

    };

    const deleteFromList = async (id) => {
        console.log('ID:', id)
        const item = tasks.find(i => i.id === id);

        console.log(item)
        console.log(tasks);
        if (item) {
            setTasks(tasks.filter((task) => task.id !== id));
            // ----- cancel the countdown notification here
            await services.cancel(item.notificationId);
        }
        console.log('NEW:', tasks)
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <View>
                    <Text style={styles.sectionTitle}>Countdowns</Text>
                </View>
                <TextInput
                    value={inputValue}
                    style={styles.input}
                    placeholder='Enter Countdown Title...'
                    testID="input"
                    onChangeText={(text) => handleInputChange(text)}
                />
                <View style={styles.datePicker}>
                    <DateTimePicker
                        value={inputDate}
                        mode="datetime"
                        testID="picker"
                        onChange={(e, date) => setDate(date)}
                    />
                </View>
                <TouchableOpacity
                    onPress={addToList}
                    testID="addBtn"
                >
                    <View style={styles.btn}>
                        <Text style={{ color: "white" }}>Start Countdown</Text>
                        <Entypo
                            style={{ marginLeft: 5, color: "white" }}
                            name='hour-glass'
                            size={20}
                            color='black'
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.items}>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={tasks}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Countdown countdown={item} deleteFromList={deleteFromList}/>
                        )}
                    />
                </View>
            </View>
            <StatusBar style='auto'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#E8EAED",
    },
    btn: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#008080",
        color: "#ffffff",
    },
    taskWrapper: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 38,
        fontWeight: "bold",
        marginBottom: 10,
    },
    items: {
        flex: 1,
        marginTop: 30,
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    datePicker: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
});
