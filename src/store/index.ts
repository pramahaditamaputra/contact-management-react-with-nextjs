import { configureStore } from "@reduxjs/toolkit";
import contactPaginationReducer from "../features/contact/presentation/state/contact-pagination.slice";

export const store = configureStore({
  reducer: {
    contactPagination: contactPaginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
