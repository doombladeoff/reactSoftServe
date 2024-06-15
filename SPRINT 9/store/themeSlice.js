import { createSlice } from "@reduxjs/toolkit";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";

const initialState = {
    isDark: true,
    colors: COLORS_DARK,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle: (state) => {
            state.isDark = !state.isDark;
            state.colors = state.isDark ? COLORS_DARK : COLORS_LIGHT;
        },
    },
});

// For correct passing of the tests please, leave these exports as they are
export const themeActions = themeSlice.actions;

export default themeSlice;
