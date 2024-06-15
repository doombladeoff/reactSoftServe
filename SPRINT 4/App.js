import { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";

export const SCREENS = {
  ADD_WORD: "addWord",
  ALL_WORDS: "allWords",
};
export default function App() {
  const [activeSreen, setActiveScreen] = useState(SCREENS.ALL_WORDS);
  const [words, setWords] = useState([]);

  const switchScreen = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      {activeSreen === SCREENS.ALL_WORDS && (
        <AllWords
          switchScreen={switchScreen}
          words={words}
          deleteWordHandler={setWords}
        />
      )}
      {activeSreen === SCREENS.ADD_WORD && (
        <AddWord switchScreen={switchScreen} setWords={setWords} />
      )}
    </SafeAreaView>
  );
}
