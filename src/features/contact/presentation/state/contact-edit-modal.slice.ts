import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  isOpen: boolean;
  contactId: string | null;
};

const initialState: State = {
  isOpen: false,
  contactId: null,
};

const contactEditModalSlice = createSlice({
  name: "contactEditModal",
  initialState,
  reducers: {
    openContactEditModal(state: State, action: PayloadAction<string>) {
      state.isOpen = true;
      state.contactId = action.payload;
    },
    closeContactEditModal(state: State) {
      state.isOpen = false;
      state.contactId = null;
    },
  },
});

export const { openContactEditModal, closeContactEditModal } =
  contactEditModalSlice.actions;
export default contactEditModalSlice.reducer;
