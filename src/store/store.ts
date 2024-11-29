import { configureStore } from "@reduxjs/toolkit";
import redus from "../reduser/redus"; 

export const store = configureStore({
  reducer: {
    redus,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
