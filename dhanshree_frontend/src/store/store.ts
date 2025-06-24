import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice";
import requestReducer from "./slices/requestSlice";
import {
  propertyReducer,
  propertyDetailsReducer,
} from "./slices/propertyDetailsSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    request: requestReducer,
    property: propertyReducer,
    propertyDetails: propertyDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
