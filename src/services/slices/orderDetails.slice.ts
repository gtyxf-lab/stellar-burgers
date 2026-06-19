import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderError: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message || 'Ошибка заказа';
      });
  }
});

export const { clearOrder } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
