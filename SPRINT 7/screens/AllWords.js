import { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Image,
    Pressable,
    Text
} from "react-native";
import Item from "../components/ListItem";
import Ionicons from "@expo/vector-icons/Ionicons";

import { styles } from "../styles/AllWordsStyles";
import { COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";


function AllWords({ route, navigation }) {
    const [myWords, setMyWords] = useState([]);

    function deleteWord(wordToDelete) {
        setMyWords((prev) => prev.filter((item) => item.word != wordToDelete));
    }

    useEffect(() => {
        if (route.params?.newWord) setMyWords(prevState => [...prevState, route.params.newWord]);

        if (route.params?.editWord) {
            const updatedWords = myWords.map(item =>
                item.word === route.params.editWord.word ? route.params.editWord : item
            );
            setMyWords(updatedWords);
        }
    }, [route.params]);

    return (
        <>
            <StatusBar style="light"/>
            <Pressable
                style={styles.addPressable}
                onPress={() => navigation.navigate("AddWord")}
            >
                <Ionicons name="add-outline" size={46} color={COLORS.white}/>
            </Pressable>
            <View style={{ flex: 2, backgroundColor: COLORS.appBackground }}>
                <FlatList
                    data={myWords}
                    renderItem={({ item }) => <Item item={item} onDelete={deleteWord}/>}
                    keyExtractor={(item) => item.word}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.textEmpty}>No words yet</Text>
                        </View>
                    }
                    ListHeaderComponent={
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../assets/cartoon-squirrel-mike-sm.png")}
                            />
                        </View>
                    }
                />
            </View>
        </>
    );
}

export default AllWords;
