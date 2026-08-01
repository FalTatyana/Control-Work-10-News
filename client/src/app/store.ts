import {configureStore} from "@reduxjs/toolkit";
import { PostReducer } from "./postsSlice";

export const store = configureStore({
  reducer: {
    posts: PostReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;