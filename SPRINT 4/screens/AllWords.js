import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREENS } from "../App";

import { playSound } from "../services/soundHandler";

function AllWords({ words, switchScreen, deleteWordHandler }) {
  const onDeleteWord = (index) => {
    const newWords = words.filter((_, i) => i !== index);
    deleteWordHandler(newWords);
  };

  const onPlaySound = (audio) => {
    playSound(audio);
  };

  const onPressedButtonStyle = (pressed) => ({
    opacity: pressed ? 0.5 : 1,
  });

  const renderItems = (item, index) => {
    return (
      <View style={[styles.wordsContainer, styles.shadow]}>
        <Pressable
          onPress={() => {
            if (item?.audio) onPlaySound(item.audio);
          }}
          style={({ pressed }) => onPressedButtonStyle(pressed)}
        >
          <Ionicons name="play-outline" size={32} color="blue" />
        </Pressable>

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.word}</Text>
          {item?.meaning && <Text style={{ width: 300 }}>{item.meaning}</Text>}
        </View>

        <Pressable
          onPress={() => {
            onDeleteWord(index);
          }}
          style={({ pressed }) => onPressedButtonStyle(pressed)}
        >
          <Ionicons name="trash-outline" size={32} color="red" />
        </Pressable>
      </View>
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.noWordsContainer}>
        <Text style={{ textAlign: "center", fontSize: 24 }}>No words yet</Text>
      </View>
    );
  };

  return (
    <View>
      <Image
        source={require("../assets/title-reading-side.png")}
        style={{ width: "auto", height: 200, resizeMode: "contain" }}
      />
      <View style={styles.addButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            styles.shadow,
            onPressedButtonStyle(pressed),
          ]}
          onPress={() => {
            switchScreen(SCREENS.ADD_WORD);
          }}
        >
          <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>

      <View>
        <FlatList
          data={words}
          renderItem={({ item, index }) => renderItems(item, index)}
          ListEmptyComponent={() => renderEmptyList()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    top: 15,
    position: "relative",
    alignItems: "flex-end",
    paddingRight: 30,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: "blue",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  noWordsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    backgroundColor: "grey",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  wordsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
});

export default AllWords;
