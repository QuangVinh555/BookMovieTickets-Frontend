import { createSlice } from "@reduxjs/toolkit";
export const BookTicketSlice = createSlice({
    name: "bookTicket",
    initialState:{
        pending: false,
        error: false,
        bookTicket: null,
        bookTickets: [],
    },
    reducers:{
        bookTicketStart: (state) => {
            state.pending = true
        },
        bookTicketError: (state) => {
            state.pending = false;
            state.error = true;
        },   
        createBookTicket: (state, action) => {
            state.pending = false;
            state.bookTicket = action.payload;
            state.error = true;
        },   
    }
});

export const {bookTicketStart, bookTicketError, createBookTicket} = BookTicketSlice.actions;
export default BookTicketSlice.reducer;