import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import orderReduecer from "./Order/OrderSlide";
export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReduecer
  },
});
