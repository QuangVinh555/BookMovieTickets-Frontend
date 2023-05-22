import axios from "axios";
import { chairError, chairStart, getAllChairByCinemaRoomId } from "./ChairSlice";

export const getAllChairByCinemaRoomIdApi = async(param, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(chairStart());
    try{
        const res = await axios.get(`${PK}/chair/cinemaRoom/${param}`);
        dispatch(getAllChairByCinemaRoomId(res.data));
        console.log(res.data)
    }catch(err){
        dispatch(chairError());
    }
}



