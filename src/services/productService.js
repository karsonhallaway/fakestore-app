import axios from "axios";


/* =======================
Axios Instance 
======================= */
const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 5000,
    headers: {
        'Content-Type' : 'application/json'
    }
});

/* =======================
Functions
======================= */

export const getProducts = async () => {
    try {
        const productResponse = await api.get(`/products`);
        return productResponse.data;
    } catch (error) {
        console.error('Error fetching data. Refresh page...', error.message);
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        const productIdResponse = await api.get(`/products/${id}`);
        return productIdResponse.data;
    } catch (error) {
        console.error('Error fetching product details. Refresh page...', error.message);
        throw error;
    }
}

export const createProduct = async (data) => {
    try {
        const createProductResponse = await api.post(`/products`, data);
        return createProductResponse.data
    } catch (error) {
        console.error('Error posting product. Try again...', error.message);
        throw error;
    }
}

export const updateProduct = async (id, data) => {
    try {
        const updateProductResponse = await api.put(`/products/${id}`, data);
        return updateProductResponse.data;
    } catch (error) {
        console.error('Error updating product. Try again...', error.message);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const deleteProductResponse = await api.delete(`/products/${id}`);
        return deleteProductResponse.data;
    } catch (error) {
        console.error('Failed to delete product. Try again...');
        throw error;
    }
}


