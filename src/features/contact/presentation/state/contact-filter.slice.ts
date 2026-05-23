import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  keyword: string;
};

const initialState: State = {
  keyword: "",
};

const contactFilterSlice = createSlice({
  name: "contactFilter",
  initialState,
  reducers: {
    setKeyword(state: State, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    resetKeyword(state: State) {
      state.keyword = "";
    },
  },
});

export const { setKeyword, resetKeyword } = contactFilterSlice.actions;
export default contactFilterSlice.reducer;
