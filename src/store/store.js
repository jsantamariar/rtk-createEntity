import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./slices/comments/commentsSlice";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export default store;
