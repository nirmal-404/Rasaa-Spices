import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../utils";

const initialState = {
  isLoading: false,
  heroImageList: [],
};

export const getHeroImages = createAsyncThunk(
  "/order/getHeroImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/hero/get`
    );

    return response.data;
  }
);


export const addHeroImage = createAsyncThunk(
  "order/addHeroImage",
  async (image, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue('Authentication token missing');

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/common/hero/add`,
        { image },
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

export const deleteHeroImage = createAsyncThunk(
  "products/deleteHeroImage",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue('Authentication token missing');

      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/common/hero/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
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
