import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../utils";

const initialState = {
    wishlistItems: [],
    isLoading: false,
};

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('Authentication token missing');

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/shop/wishlist/add`,
                { userId, productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchWishlistItems = createAsyncThunk(
    "wishlist/fetchWishlistItems",
    async (userId, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('Authentication token missing');

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/shop/wishlist/get/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteWishlistItem = createAsyncThunk(
    "wishlist/deleteWishlistItem",
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('Authentication token missing');

            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/shop/wishlist/${userId}/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateWishlistQuantity = createAsyncThunk(
    "wishlist/updateWishlistQuantity",
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('Authentication token missing');

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/shop/wishlist/update-wishlist`,
                { userId, productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const shoppingWishlistSlice = createSlice({
    name: "shoppingWishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = action.payload.data;
            })
            .addCase(addToWishlist.rejected, (state) => {
                state.isLoading = false;
                state.wishlistItems = [];
            })
            .addCase(fetchWishlistItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWishlistItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = action.payload.data;
            })
            .addCase(fetchWishlistItems.rejected, (state) => {
                state.isLoading = false;
                state.wishlistItems = [];
            })
            .addCase(updateWishlistQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateWishlistQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = action.payload.data;
            })
            .addCase(updateWishlistQuantity.rejected, (state) => {
                state.isLoading = false;
                state.wishlistItems = [];
            })
            .addCase(deleteWishlistItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = action.payload.data;
            })
            .addCase(deleteWishlistItem.rejected, (state) => {
                state.isLoading = false;
                state.wishlistItems = [];
            });
    },
});

export default shoppingWishlistSlice.reducer;
