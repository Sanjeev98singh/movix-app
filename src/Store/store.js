import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "../Slice/MovieSlice";

const Store = configureStore({
    reducer: {
        MovieSlice,
    }
})

export default Store;