import { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { SCREENS } from "../App";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";

function AddWord({ switchScreen, setWords }) {
  const [searchText, setText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [searchResults, setSearchResults] = useState(null);

  const onSwitchScreen = () => {
    switchScreen(SCREENS.ALL_WORDS);
  };

  const onPlaySound = (audio) => {
    playSound(audio);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText.trim() == "") return;
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const fetchWord = async () => {
      if (debouncedSearchText) {
        const response = await getWordInfo(searchText);
        setSearchResults(response);
      }
    };
    fetchWord();
  }, [debouncedSearchText]);

  return (
    <View>
      <Image
        source={require("../assets/add.png")}
        style={{ width: "auto", height: 200, resizeMode: "contain" }}
      />
      <View style={styles.backButtonContainer}>
        <Pressable onPress={onSwitchScreen}>
          <Ionicons name="arrow-back-outline" size={32} color="blue" />
        </Pressable>
      </View>
      <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <Text>Your word to search</Text>
        <TextInput
          style={styles.textInput}
          placeholder="type here.."
          value={searchText}
          onChangeText={setText}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        {searchResults && (
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.wordContainer}>
              <Text style={{ fontSize: 24 }}>{searchResults.word}</Text>
              {searchResults?.audio && (
                <>
                  <Pressable onPress={() => onPlaySound(searchResults.audio)}>
                    <Ionicons
                      name="volume-medium-outline"
                      size={32}
                      color="blue"
                    />
                  </Pressable>
                  <Text>{searchResults?.phonetics}</Text>
                </>
              )}
            </View>
            <Text style={{ fontSize: 18 }}>{searchResults?.partOfSpeech}</Text>
            <Text style={{ marginVertical: 10 }}>{searchResults?.meaning}</Text>
            <Pressable
              style={styles.addButton}
              onPress={() => {
                setWords((prevState) => [...prevState, searchResults]);
                onSwitchScreen();
              }}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    top: 10,
    left: 20,
    position: "absolute",
    alignItems: "flex-start",
    zIndex: 1,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
  },
  addButtonContainer: {
    top: 10,
    position: "relative",
    alignItems: "flex-end",
    paddingRight: 30,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    paddingVertical: 5,
    fontSize: 24,
  },
});

export default AddWord;
