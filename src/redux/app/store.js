import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import fetchDataSlice from "../features/fetchDataSlice";
import productDataSlice from "../features/productDataSlice";


export const store=configureStore({
    reducer:{
        allCart:cartSlice,
        productData:productDataSlice,
        fetchData:fetchDataSlice,
    }
})