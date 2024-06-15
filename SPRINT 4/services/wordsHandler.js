import axios from "axios";

import { BASE_URL } from "../constants";

export async function getWordInfo(word) {
  try {
    const wordInfo = (await axios.get(`${BASE_URL}/${word}`)).data[0];

    return {
      word: wordInfo.word,
      phonetics: wordInfo.phonetics[0]?.text,
      audio: wordInfo.phonetics[0]?.audio,
      partOfSpeech: wordInfo.meanings[0]?.partOfSpeech,
      meaning: wordInfo.meanings[0]?.definitions[0].definition,
    };
  } catch (error) {
    return {
      word: word,
      phonetics: "",
      audio: "",
      partOfSpeech: "",
      meaning: "",
    };
  }
}
