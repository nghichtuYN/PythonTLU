import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
  shippingAddress: "",
  user: "",
  isPaid: false,
};
export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem, shippingAddress } = action.payload;
      const alreadyItem = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (alreadyItem) {
        alreadyItem.amount += orderItem.amount;
      } else {
        state?.orderItems?.push(orderItem);
      }
      state.shippingAddress = shippingAddress;
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
