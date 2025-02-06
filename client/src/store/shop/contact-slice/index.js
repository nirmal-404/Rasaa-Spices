import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  contactList: [],
};

export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/contact`,
      formData
    );
    return response.data;
  }
);

export const getUserContactForms = createAsyncThunk(
  "contact/getUserContactForms",
  async (email) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/contact/${email}`
    );
    return response.data;
  }
);

export const editContactForm = createAsyncThunk(
  "contact/editContactForm",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/contact/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteContactForm = createAsyncThunk(
  "contact/deleteContactForm",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/contact/${id}`
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
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(submitContactForm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserContactForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserContactForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactList = action.payload.data;
      })
      .addCase(getUserContactForms.rejected, (state) => {
        state.isLoading = false;
        state.contactList = [];
      })
  },
});

export default contactSlice.reducer;