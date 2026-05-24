import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contact } from "../../domain/entities/contact";

type State = {
  isOpen: boolean;
  contact: Contact | null;
};

const initialState: State = {
  isOpen: false,
  contact: null,
};

const contactDeleteModalSlice = createSlice({
  name: "contactDeleteModal",
  initialState,
  reducers: {
    openContactDeleteModal(state: State, action: PayloadAction<Contact>) {
      state.isOpen = true;
      state.contact = action.payload;
    },
    closeContactDeleteModal(state: State) {
      state.isOpen = false;
      state.contact = null;
    },
  },
});

export const { openContactDeleteModal, closeContactDeleteModal } =
  contactDeleteModalSlice.actions;
export default contactDeleteModalSlice.reducer;
