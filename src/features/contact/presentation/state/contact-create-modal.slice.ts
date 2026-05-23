import { createSlice } from "@reduxjs/toolkit";

type State = {
  isOpen: boolean;
};

const initialState: State = {
  isOpen: false,
};

const contactCreateModalSlice = createSlice({
  name: "contactCreateModal",
  initialState,
  reducers: {
    openContactCreateModal(state: State) {
      state.isOpen = true;
    },
    closeContactCreateModal(state: State) {
      state.isOpen = false;
    },
  },
});

export const { openContactCreateModal, closeContactCreateModal } =
  contactCreateModalSlice.actions;
export default contactCreateModalSlice.reducer;
