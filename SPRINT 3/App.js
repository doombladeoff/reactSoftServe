import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";

const App = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "Card 1", description: "Description for Card 1" },
    { id: 2, title: "Card 2", description: "Description for Card 2" },
    { id: 3, title: "Card 3", description: "Description for Card 3" },
    { id: 4, title: "Card 4", description: "Description for Card 4" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.cardContainer}>
        {cards.map((card) => (
          <Pressable
            key={card.id}
            style={styles.button}
            onPress={() => {
              setSelectedCard(card);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>{card.title}</Text>
          </Pressable>
        ))}
      </View>

      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.modalContaier}>
            {selectedCard && (
              <View style={styles.cardDetailContainer}>
                <Text>{selectedCard.title}</Text>
                <Text>{selectedCard.description}</Text>
              </View>
            )}
            <Pressable
              style={[
                styles.button,
                { backgroundColor: "gray", borderColor: "transparent" },
              ]}
              onPress={() => {
                setModalVisible(false);
                setSelectedCard(null);
              }}
            >
              <Text style={[styles.buttonText, { textAlign: "center" }]}>
                Close
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  button: {
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    padding: 10,
  },
  modalContaier: {
    padding: 10,
  },
  cardDetailContainer: {
    marginVertical: 10,
  },
});

export default App;
