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

const contactEditModalSlice = createSlice({
  name: "contactEditModal",
  initialState,
  reducers: {
    openContactEditModal(state: State, action: PayloadAction<Contact>) {
      state.isOpen = true;
      state.contact = action.payload;
    },
    closeContactEditModal(state: State) {
      state.isOpen = false;
      state.contact = null;
    },
  },
});

export const { openContactEditModal, closeContactEditModal } =
  contactEditModalSlice.actions;
export default contactEditModalSlice.reducer;