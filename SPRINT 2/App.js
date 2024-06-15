import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";

const BACKGROUND_COLOR = "#ffffff";
const PRESSED_BACKGROUND_COLOR = "#ffcccc";
const NOTE_COLOR = "#ffffff";
const PRESSED_NOTE_COLOR = "#ffff00";

export default function App() {
  // your work with state
  const [inputText, setInputText] = useState("");
  const [notes, setNote] = useState([]);
  const [pressedNoteIndex, setPressedNoteIndex] = useState(null);

  function inputHandler(text) {
    return setInputText(text);
  }

  function add_note() {
    const isEmptyField = inputText.trim();
    if (!isEmptyField) {
      return;
    } else {
      setNote([...notes, inputText]), setInputText("");
    }
  }

  function longPress(index) {
    return (
      setPressedNoteIndex(index),
      alert("The note is pressed with a delay of 1 sec!")
    );
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your note"
          onChangeText={inputHandler}
          value={inputText}
        />
        <Button title="Add note" onPress={add_note} />
      </View>
      <View testID="notesContainer">
        {notes.map((note, index) => (
          <Pressable
            key={index}
            testID="pressableElem"
            onLongPress={() => longPress(index)}
            style={{
              backgroundColor:
                pressedNoteIndex === index
                  ? PRESSED_BACKGROUND_COLOR
                  : BACKGROUND_COLOR,
            }}
          >
            <Text
              testID="noteElem"
              style={[
                styles.noteElem,
                {
                  color:
                    pressedNoteIndex === index
                      ? PRESSED_NOTE_COLOR
                      : NOTE_COLOR,
                },
              ]}
            >
              {note}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  noteElem: {
    margin: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#008000",
    fontSize: 16,
    textAlign: "center",
  },
});
