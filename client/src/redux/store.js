import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import logoutSlice from "./logoutSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        loader: loaderSlice,
        logout: logoutSlice,
        user: userSlice
    },
});

export default store;