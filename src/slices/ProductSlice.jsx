import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "./ProductApi";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
  };
  
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProductData = action.payload;
        console.log('Updated product data:', updatedProductData);
        const index = state.products.findIndex((product) => product.id === updatedProductData.product.id);
        console.log('Index:', index);
        state.products.splice(index,1,updatedProductData.product)
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedProductId = action.payload;
        state.products = state.products.filter((product) => product.id !== deletedProductId);
      });
  },
});

export default productsSlice.reducer;
