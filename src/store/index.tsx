import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./TaskSlice.ts";
import themeSlice from "./themeSlice.ts";

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
