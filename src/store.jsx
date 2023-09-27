import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";

const Store=configureStore({
    reducer:{
        products:ProductSlice
    }
});
export default Store;