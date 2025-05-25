import { configureStore } from "@reduxjs/toolkit";
import { propertyReducer, propertyDetailsReducer } from "@/store/slices/propertyDetailsSlice";
import languageReducer from "./slices/languageSlice";


export const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertyDetails: propertyDetailsReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;