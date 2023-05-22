import { createSlice } from "@reduxjs/toolkit";
export const ChairSlice = createSlice({
    name: "cinemaRoom",
    initialState:{
        pending: false,
        error: false,
        chair: null,
        chairs: [],
    },
    reducers:{
        chairStart: (state) => {
            state.pending = true
        },
        chairError: (state) => {
            state.pending = false;
            state.error = true;
        },
        getAllChairByCinemaRoomId: (state,action) => {
            state.pending = false;
            state.chairs = action.payload
            state.error = false;
        },
       
    }
});

export const {chairStart, chairError, getAllChairByCinemaRoomId} = ChairSlice.actions;
export default ChairSlice.reducer;