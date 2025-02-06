import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    allContacts: [],
};

export const getAllContactForms = createAsyncThunk(
    "contact/getAllContactForms",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/admin/contact/"
        );
        return response.data;
    }
);

export const deleteContactForm = createAsyncThunk(
    "contact/deleteContactForm",
    async (id) => {
        const response = await axios.delete(
            `http://localhost:5000/api/admin/contact/${id}`
        );
        return response.data;
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllContactForms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllContactForms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allContacts = action.payload.data;
            })
            .addCase(getAllContactForms.rejected, (state) => {
                state.isLoading = false;
                state.allContacts = [];
            })
    },
});

export default contactSlice.reducer;