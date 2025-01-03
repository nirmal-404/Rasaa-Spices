import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    contactList: [], // Changed to contactList
};

export const fetchAllContacts = createAsyncThunk(
    "/contacts/fetchAllContacts",
    async () => {
        const result = await axios.get(
            "http://localhost:5000/api/admin/contact/get"
        );

        return result?.data;
    }
);


export const deleteContact = createAsyncThunk(
    "/contacts/deleteContact",
    async (id) => {
      const result = await axios.delete(
        `http://localhost:5000/api/admin/contact/delete/${id}`
      );
    
      return result?.data;
    }
);

const contactSlice = createSlice({
    name: "userContacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllContacts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchAllContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.contactList = action.payload.data;
          })
          .addCase(fetchAllContacts.rejected, (state) => {
            state.isLoading = false;
            state.contactList = [];
          })
      },
      
});

export default contactSlice.reducer;
