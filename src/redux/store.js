import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./global/GlobalSlice";
export default configureStore({
    reducer: {
        global: GlobalReducer
    }  
});