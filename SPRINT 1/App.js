import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import ImagePile from "./components/ImagePile";
import StatisticsInfo from "./components/StatisticsInfo";

const backgroundImg = require("./assets/ocean.jpg");

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={backgroundImg}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />
      <View style={styles.container}>
        <StatisticsInfo />
        <ImagePile />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
});
