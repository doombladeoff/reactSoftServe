import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
    words: [],
};

const getNewDate = () => new Date().getTime();

const wordsLearningSlice = createSlice({
    name: "wordsLearning",
    initialState,
    reducers: {
        addWord: (state, action) => {
            const now = getNewDate();
            const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;
            const existingWord = state.words.find((w) => w.word === word);
            if (!existingWord) {
                state.words.push({
                    word,
                    phonetics,
                    audio,
                    meaning,
                    partOfSpeech,
                    status: 0,
                    dateForgets: now - INITIAL_FORGETTING_SPAN,
                    dateTotallyForgets: now,
                    forgettingSpan: INITIAL_FORGETTING_SPAN,
                })
            }
        },
        updateWord: (state, action) => {
            const {
                word,
                phonetics,
                audio,
                meaning,
                partOfSpeech,
            } = action.payload;
            const existingWordIndex = state.words.findIndex(w => w.word === word);
            if (existingWordIndex !== -1) {
                state.words[existingWordIndex] = {
                    ...state.words[existingWordIndex],
                    phonetics,
                    audio,
                    meaning,
                    partOfSpeech,
                }
            }
        },
        removeWord: (state, action) => {
            const wordToRemove = action.payload;
            state.words = state.words.filter(w => w.word !== wordToRemove);
        },
        updateWordLearnInfo: (state, action) => {
            const wordToUpdate = action.payload;
            const wordIndex = state.words.findIndex(w => w.word === wordToUpdate);
            if (wordIndex !== -1) {
                const word = state.words[wordIndex];
                const now = getNewDate();
                state.words[wordIndex] = {
                    ...word,
                    status: 2,
                    forgettingSpan: word.forgettingSpan * 2,
                    dateForgets: now + word.forgettingSpan,
                    dateTotallyForgets: now + word.forgettingSpan * 2,
                };
            }
        },
        updateStatuses: (state) => {
            const now = getNewDate()
            state.words.forEach(word => {
                if (now < word.dateForgets)
                    return;

                if (now >= word.dateForgets && now <= word.dateTotallyForgets)
                    word.status = 1;

                if (now >= word.dateTotallyForgets)
                    word.status = 0;

            });
        },
    },
});

// For correct passing of the tests please, leave these exports as they are
export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;
