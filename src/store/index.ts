import { configureStore } from "@reduxjs/toolkit";
import contactFilterReducer from "../features/contact/presentation/state/contact-filter.slice";

export const store = configureStore({
  reducer: {
    contactFilter: contactFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
