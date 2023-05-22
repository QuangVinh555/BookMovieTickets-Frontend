import axios from "axios";
import { cinemaNameError, cinemaNameStart, createCinemaName, getAllCinemaNames, getAllCinemaNamesByCinemaTypeId, getAllCinemaNamesByLocationId, getAllCinemaNamesByLocationIdAndCinemaTypeId, getAllCinemaNamesByPage } from "./CinemaNameSlice";

export const getAllCinemaNamesByPageApi = async(param, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(cinemaNameStart());
    try{
        const res = await axios.get(`${PK}/cinemaname/page?page=${param}`);
        dispatch(getAllCinemaNamesByPage(res.data));
    }catch(err){
        dispatch(cinemaNameError());
    }
}

export const getAllCinemaNamesApi = async(dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(cinemaNameStart());
    try{
        const res = await axios.get(`${PK}/cinemaname`);
        dispatch(getAllCinemaNames(res.data));
    }catch(err){
        dispatch(cinemaNameError());
    }
}

export const getAllCinemaNamesByLocationIdApi = async(param, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(cinemaNameStart());
    try{
        const res = await axios.get(`${PK}/cinemaname?locationId=${param}`);
        dispatch(getAllCinemaNamesByLocationId(res.data));
    }catch(err){
        dispatch(cinemaNameError());
    }
}

export const getAllCinemaNamesByCinemaTypeIdApi = async(param, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(cinemaNameStart());
    try{
        const res = await axios.get(`${PK}/cinemaname?cinemaTypeId=${param}`);
        dispatch(getAllCinemaNamesByCinemaTypeId(res.data));
    }catch(err){
        dispatch(cinemaNameError());
    }
}

export const getAllCinemaNamesByLocationIdAndCinemaTypeIdApi = async(param1, param2, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    dispatch(cinemaNameStart());
    try{
        const res = await axios.get(`${PK}/cinemaname?locationId=${param1}&cinemaTypeId=${param2}`);
        dispatch(getAllCinemaNamesByLocationIdAndCinemaTypeId(res.data));
    }catch(err){
        dispatch(cinemaNameError());
    }
}

export const createCinemaNameApi = async(cinemaName, dispatch) => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    await dispatch(cinemaNameStart());
    try{
        const res = await axios.post(`${PK}/cinemaname`, cinemaName);
        await dispatch(createCinemaName(res.data));
    }catch(err){
        await dispatch(cinemaNameError());
    }
}

// export const updateUserRankApi = async(userRank, param, dispatch) => {
//     const PK = process.env.REACT_APP_PUBLIC_API;
//     await dispatch(userRankStart());
//     try{
//         const res = await axios.put(`${PK}/rankuser/${param}`, userRank);
//         await dispatch(updateUserRank(res.data));
//     }catch(err){
//         await dispatch(userRankError());
//     }
// }

// export const deleteUserRankApi = async(param, dispatch) => {
//     const PK = process.env.REACT_APP_PUBLIC_API;
//     await dispatch(userRankStart());
//     try{
//         const res = await axios.delete(`${PK}/rankuser/${param}`);
//         await dispatch(deleteUserRank(res.data));
//     }catch(err){
//         await dispatch(userRankError());
//     }
// }
