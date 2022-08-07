import {createSlice} from "@reduxjs/toolkit";

export const dataSlise = createSlice({
    name: "dataStore",
    initialState: {
        firstScreenVisibility: 1,
        scrollPosition: 0,
        isMenuExpanded: false,
        isCtaVisible: false,
        queryPrice: ""
    },
    reducers: {
        setFirstScreenVisibility: (state, action) => {
            state.firstScreenVisibility = action.payload
        },
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload
        },
        setMenuExpanded: (state, action) => {
            state.isMenuExpanded = !!action.payload;
        },
        setCtaVisible: (state, action) => {
            state.isCtaVisible = !!action.payload;
        },
        setQueryPrice: (state, action) => {
            state.queryPrice = action.payload;
        }
    }
});

export const {setFirstScreenVisibility, setScrollPosition, setMenuExpanded, setCtaVisible, setQueryPrice, setFan} = dataSlise.actions;

export const getFirstScreenVisibility = state => state.rootReducer.firstScreenVisibility;
export const getScrollPosition = state => state.rootReducer.scrollPosition;
export const getMenuExpanded = state => state.rootReducer.isMenuExpanded;
export const getCtaVisible = state => state.rootReducer.isCtaVisible;
export const getQueryPrice = state => state.rootReducer.queryPrice;

export default dataSlise.reducer;
