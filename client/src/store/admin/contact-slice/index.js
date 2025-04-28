import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../utils";


const initialState = {
    isLoading: false,
    allContacts: [],
};

export const getAllContactForms = createAsyncThunk(
    "contact/getAllContactForms",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('Authentication token missing');

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/contact/`,
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

export const deleteContactForm = createAsyncThunk(
    "contact/deleteContactForm",
    async (id, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('Authentication token missing');

            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/admin/contact/${id}`,
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