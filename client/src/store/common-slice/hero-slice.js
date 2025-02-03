import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  heroImageList: [],
};

export const getHeroImages = createAsyncThunk(
  "/order/getHeroImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/hero/get`
    );

    return response.data;
  }
);

export const addHeroImage = createAsyncThunk(
  "/order/addHeroImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/hero/add`,
      { image }
    );

    return response.data;
  }
);

export const deleteHeroImage = createAsyncThunk(
  "/products/deleteHeroImage",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/common/hero/delete/${id}`
    );

    return result?.data;
  }
);

const heroSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHeroImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHeroImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroImageList = action.payload.data;
      })
      .addCase(getHeroImages.rejected, (state) => {
        state.isLoading = false;
        state.heroImageList = [];
      });
  },
});

export default heroSlice.reducer;
