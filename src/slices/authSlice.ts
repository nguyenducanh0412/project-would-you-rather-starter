import { RootState } from "./../rootReducer";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  status: "",
  data: "",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuthSuccessfully(state, action) {
      state.status = "successfully";
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const {
  getAuthSuccessfully,
} = actions;

export const rootSelector = (state: RootState) => (state as any)["auth"];

export const authSelector = createSelector(
  rootSelector,
  (state) => state
);

export default reducer;
