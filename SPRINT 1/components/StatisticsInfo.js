import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import InfoCard from "./InfoCard";

import words from "../data/words";

const StatisticsInfo = () => {
  const statusGroups = words.reduce((groups, word) => {
    if (!groups[word.status]) {
      groups[word.status] = [];
    }
    groups[word.status].push(word);
    return groups;
  }, {});

  const toLearnWords = statusGroups["to learn"];
  const inProcessWords = statusGroups["in process"];
  const learnedWords = statusGroups["learned"];

  return (
    <View style={styles.container}>
      <InfoCard
        caption={"To learn"}
        number={toLearnWords.length}
        color={"hotpink"}
      />
      <InfoCard
        caption={"In process"}
        number={inProcessWords.length}
        color={"lightgreen"}
      />
      <InfoCard
        caption={"Learned"}
        number={learnedWords.length}
        color={"lightblue"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StatisticsInfo;
