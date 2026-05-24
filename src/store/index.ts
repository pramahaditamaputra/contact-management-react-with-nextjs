import { configureStore } from "@reduxjs/toolkit";
import contactFilterReducer from "../features/contact/presentation/state/contact-filter.slice";
import contactCreateModalReducer from "../features/contact/presentation/state/contact-create-modal.slice";
import contactEditModalReducer from "../features/contact/presentation/state/contact-edit-modal.slice";
import contactDeleteModalReducer from "../features/contact/presentation/state/contact-delete-modal.slice";

export const store = configureStore({
  reducer: {
    contactFilter: contactFilterReducer,
    contactCreateModal: contactCreateModalReducer,
    contactEditModal: contactEditModalReducer,
    contactDeleteModal: contactDeleteModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
