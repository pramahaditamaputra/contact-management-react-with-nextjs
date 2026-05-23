import { configureStore } from "@reduxjs/toolkit";
import contactFilterReducer from "../features/contact/presentation/state/contact-filter.slice";
import contactCreateModalReducer from "../features/contact/presentation/state/contact-create-modal.slice";

export const store = configureStore({
  reducer: {
    contactFilter: contactFilterReducer,
    contactCreateModal: contactCreateModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
