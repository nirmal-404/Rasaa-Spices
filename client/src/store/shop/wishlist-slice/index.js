import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems: [],
    isLoading: false,
};

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/wishlist/add",
            {
                userId,
                productId,
                quantity,
            }
        );

        return response.data;
    }
);

export const fetchWishlistItems = createAsyncThunk(
    "wishlist/fetchWishlistItems",
    async (userId) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/wishlist/get/${userId}`
        );

        return response.data;
    }
);

export const deleteWishlistItem = createAsyncThunk(
    "wishlist/deleteWishlistItem",
    async ({ userId, productId }) => {
        const response = await axios.delete(
            `http://localhost:5000/api/shop/wishlist/${userId}/${productId}`
        );

        return response.data;
    }
);

export const updateWishlistQuantity = createAsyncThunk(
    "wishlist/updateWishlistQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
            "http://localhost:5000/api/shop/wishlist/update-wishlist",
            {
                userId,
                productId,
                quantity,
            }
        );

        return response.data;
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
