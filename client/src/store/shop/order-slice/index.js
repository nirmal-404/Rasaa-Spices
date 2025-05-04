import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../utils";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  paymentHash: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue('Authentication token missing');
      sessionStorage.setItem(
        "addressInfo",
        JSON.stringify(orderData.addressInfo)
      );
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        orderData,
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

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",

  async ({ paymentId, payerId, orderId }) => {
    console.log(paymentId);
    console.log(payerId);
    console.log(orderId);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      {
        paymentId,
        payerId,
        orderId,
      }
    );

    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue('Authentication token missing');

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`,
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

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue('Authentication token missing');

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`,
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

export const createNewOrderWithPaypalPayment = createAsyncThunk(
  "order/createNewOrderWithPaypalPayment",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue('Authentication token missing');
      sessionStorage.setItem(
        "addressInfo",
        JSON.stringify(orderData.addressInfo)
      );
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create-with-paypal`,
        orderData,
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

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
        state.paymentHash = action.payload.paymentHash;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.paymentHash = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(createNewOrderWithPaypalPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrderWithPaypalPayment.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
        state.paymentHash = action.payload.paymentHash;
      })
      .addCase(createNewOrderWithPaypalPayment.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.paymentHash = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
