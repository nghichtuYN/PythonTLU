import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
  user: "",
  isPaid: false,
};
export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const alreadyItem = state?.orderItems?.find(
        (item) => item?.product === orderItem.product && item?.size === orderItem.size
      );
      if (alreadyItem) {
        alreadyItem.amount += orderItem.amount;
      } else {
        state?.orderItems?.push(orderItem);
      }
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;

      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      if (itemOrder.amount > 1) {
        itemOrder.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      state.orderItems = itemOrder;
    },
  },
});

export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
} = OrderSlice.actions;

export default OrderSlice.reducer;
