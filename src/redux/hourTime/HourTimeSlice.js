import { createSlice } from "@reduxjs/toolkit";
export const ShowTimeSlice = createSlice({
    name: "hourtime",
    initialState:{
        pending: false,
        error: false,
        hourTime: null,
        hourTimes: [],
    },
    reducers:{
        hourTimeStart: (state) => {
            state.pending = true
        },
        hourTimeError: (state) => {
            state.pending = false;
            state.error = true;
        },
        getAllHourTimeByCinemaRoomId: (state, action) => {
            state.pending = false;
            state.hourTimes = action.payload;
            state.error = false;
        },
        createHourTime: (state, action) => {
            state.pending = false;
            state.hourTime = action.payload;
            state.error = false;
        },
        deleteHourTime: (state, action) => {
            state.pending = false;
            state.hourTime = action.payload;
            state.error = false;
        },
    }
});

export const {hourTimeStart, hourTimeError, getAllHourTimeByCinemaRoomId, createHourTime, deleteHourTime} = ShowTimeSlice.actions;
export default ShowTimeSlice.reducer;