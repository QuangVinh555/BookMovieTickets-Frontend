import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./global/GlobalSlice";
import UserReducer from "./user/UserSlice";
import UserTypeReducer from "./userType/UserTypeSlice";
import UserRankReducer from "./userRank/UserRankSlice";
import LocationReducer from "./location/LocationSlice";
export default configureStore({
    reducer: {
        global: GlobalReducer,
        user: UserReducer,
        userType: UserTypeReducer,
        userRank: UserRankReducer,
        location: LocationReducer
    }  
});