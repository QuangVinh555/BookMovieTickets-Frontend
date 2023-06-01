import axios from "axios";
import { bookTicketError, bookTicketStart, createBookTicket } from "./BookTicketSlice";

export const createBookTicketApi = async(bookTicket, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(bookTicketStart());
    try{
        const res = await axios.post(`${PK}/bookticket`, bookTicket);
        dispatch(createBookTicket(res.data));
    }catch(err){
        dispatch(bookTicketError());
    }
}
