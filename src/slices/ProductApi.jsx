import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getJWTToken = () => {
  return localStorage.getItem('jwtToken');
};

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // const response = await axios.get('http://127.0.0.1:8000/api/products');
  // return response.data;
  try {
    const token = getJWTToken();

    if (!token) {
      // Handle the case where the JWT token is not available (e.g., redirect to login)
      console.log('JWT token is missing');
    }

    const response = await axios.get('http://127.0.0.1:8000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the request
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors here (e.g., display error messages)
    // throw error;
    console.error('fetch products API error:', error);
  }
});

// Create a new product
export const createProduct = createAsyncThunk('products/createProduct', async (newProduct) => {
  try {
    const token = getJWTToken();

    if (!token) {
      // Handle the case where the JWT token is not available (e.g., redirect to login)
      throw new Error('JWT token is missing');
    }

    const response = await axios.post('http://127.0.0.1:8000/api/products', newProduct,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    // throw error;
    console.error('add product API error:', error);
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
  console.log("updatedProductAPI",updatedProduct)
  try {
    const token = getJWTToken();

    if (!token) {
      // Handle the case where the JWT token is not available (e.g., redirect to login)
      throw new Error('JWT token is missing');
    }
    const response = await axios.put(`http://127.0.0.1:8000/api/products/`+updatedProduct.id, updatedProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
    });
    console.log('Updated product data for API:', updatedProduct);
    console.log('Update product API response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update product API error:', error);
    // throw error;
  }
});


// Delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  try {
    const token = getJWTToken();

    if (!token) {
      // Handle the case where the JWT token is not available (e.g., redirect to login)
      throw new Error('JWT token is missing');
    }

    const response = await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the request
      },
    });

    return productId;
  } catch (error) {
    // Handle errors here (e.g., display error messages)
    throw error;
  }
  // return productId; // Return the deleted product's ID for removal from the state
});