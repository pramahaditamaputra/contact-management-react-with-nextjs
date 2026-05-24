import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  isOpen: boolean;
  contactId: string | null;
};

const initialState: State = {
  isOpen: false,
  contactId: null,
};

const contactDeleteModalSlice = createSlice({
  name: "contactDeleteModal",
  initialState,
  reducers: {
    openContactDeleteModal(state: State, action: PayloadAction<string>) {
      state.isOpen = true;
      state.contactId = action.payload;
    },
    closeContactDeleteModal(state: State) {
      state.isOpen = false;
      state.contactId = null;
    },
  },
});

export const { openContactDeleteModal, closeContactDeleteModal } =
  contactDeleteModalSlice.actions;
export default contactDeleteModalSlice.reducer;
