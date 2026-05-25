import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type PaginationState } from "@tanstack/react-table";

type State = PaginationState;

const initialState: State = {
  pageIndex: 0,
  pageSize: 5,
};

const contactPaginationSlice = createSlice({
  name: "contactPagination",
  initialState,
  reducers: {
    setPagination(_state: State, action: PayloadAction<PaginationState>) {
      return action.payload;
    },
    resetPagination() {
      return initialState;
    },
  },
});

export const { setPagination, resetPagination } =
  contactPaginationSlice.actions;
export default contactPaginationSlice.reducer;
