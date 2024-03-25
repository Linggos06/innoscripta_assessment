import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
