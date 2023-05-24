import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./global/GlobalSlice";
import UserReducer from "./user/UserSlice";
import UserTypeReducer from "./userType/UserTypeSlice";
import UserRankReducer from "./userRank/UserRankSlice";
import LocationReducer from "./location/LocationSlice";
import CinemaTypeReducer from "./cinemaType/CinemaTypeSlice";
import CinemaNameReducer from "./cinemaName/CinemaNameSlice";
import CinemaRoomReducer from "./cinemaRoom/CinemaRoomSlice";
import ChairReducer from "./chair/ChairSlice";
import MovieReducer from "./movie/MovieSlice";
export default configureStore({
    reducer: {
        global: GlobalReducer,
        user: UserReducer,
        userType: UserTypeReducer,
        userRank: UserRankReducer,
        location: LocationReducer,
        cinemaType: CinemaTypeReducer,
        cinemaName: CinemaNameReducer,
        cinemaRoom: CinemaRoomReducer,
        chair: ChairReducer,
        movie: MovieReducer,
    }  
});