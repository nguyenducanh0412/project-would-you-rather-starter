import { RootState } from "./../rootReducer";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  status: "",
  data: {},
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getListUsersRequest(state) {
      state.status = "loading";
    },
    getListUsersSuccessfully(state, action) {
      state.status = "successfully";
      state.data = action.payload;
    },
    getListUsersFail(state) {
      state.status = "fail";
      state.data = {};
    },
    addAnswerToUserRequest(state) {
      state.status = "loading";
    },
    addAnswerToUserSuccessfully(state, action) {
      state.status = "successfully";
      const answers = {
        ...(state.data as any)[action.payload.authUser].answers,
        [action.payload.qid]: action.payload.answer,
      };
      const auth = {
        ...(state.data as any)[action.payload.authUser],
        answers: answers,
      };
      (state.data as any)[action.payload.authUser] = auth;
    },
    addAnswerToUserFail(state) {},
    addQuestionToUserRequest(state) {
      state.status = "loading";
    },
    addQuestionToUserSuccessfully(state, action) {
      state.status = "successfully";
      const author = action.payload.author;
      const questions = (state.data as any)[author].questions.concat(
        action.payload.id
      );
      (state.data as any)[action.payload.author] = {
        ...(state.data as any)[action.payload.author],
        questions: questions,
      };
    },
    addQuestionToUserFail(state) {},
    initialDataRequest(state) {
      state.status = "loading";
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  getListUsersRequest,
  getListUsersSuccessfully,
  getListUsersFail,
  addAnswerToUserRequest,
  addAnswerToUserSuccessfully,
  addAnswerToUserFail,
  addQuestionToUserRequest,
  addQuestionToUserSuccessfully,
  addQuestionToUserFail,
  initialDataRequest,
} = actions;

export const rootSelector = (state: RootState) => (state as any)["user"];

export const listUsersSelector = createSelector(rootSelector, (state) => state);

export default reducer;
