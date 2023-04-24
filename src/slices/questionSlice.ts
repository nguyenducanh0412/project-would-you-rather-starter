import { RootState } from "./../rootReducer";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  status: "",
  data: {},
  error: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getListQuestionsRequest(state) {
      state.status = "loading";
    },
    getListQuestionsSuccessfully(state, action) {
      state.status = "successfully";
      state.data = action.payload;
    },
    getListQuestionsFail(state) {
      state.status = "fail";
      state.data = {};
    },
    addAnswerToQuestionRequest(state) {
      state.status = "loading";
    },
    addAnswerToQuestionSuccessfully(state, action) {
      state.status = "successfully";
      const votes = (state.data as any)[action.payload.qid][
        action.payload.answer
      ].votes.concat([action.payload.authUser]);
      const answers = {
        ...(state.data as any)[action.payload.qid][action.payload.answer],
        votes: votes,
      };
      (state.data as any)[action.payload.qid] = {
        ...(state.data as any)[action.payload.qid],
        [action.payload.answer]: answers,
      };
    },
    addAnswerToQuestionFail(state) {
      state.status = "fail";
    },
    saveQuestionRequest(state, action) {
      state.status = "loading";
    },
    saveQuestionSuccessfully(state, action) {
      state.status = "successfully";
      const question = {
        ...action.payload,
      };
      (state.data as any)[action.payload.id] = question;
    },
    saveQuestionFail(state) {
      state.status = "fail";
    },
    initialDataRequest(state) {
      state.status = "loading";
    },
    saveQuestionAnswerRequest(state, action) {
      state.status = "loading";
    },
    saveQuestionAnswerSuccessfully(state, action) {
      state.status = "successfully";
    },
    saveQuestionAnswerFail(state) {
      state.status = "fail";
    },
  },
});

const { actions, reducer } = questionSlice;
export const {
  getListQuestionsRequest,
  getListQuestionsSuccessfully,
  getListQuestionsFail,
  addAnswerToQuestionRequest,
  addAnswerToQuestionSuccessfully,
  addAnswerToQuestionFail,
  initialDataRequest,
  saveQuestionRequest,
  saveQuestionSuccessfully,
  saveQuestionFail,
  saveQuestionAnswerRequest,
  saveQuestionAnswerSuccessfully,
  saveQuestionAnswerFail,
} = actions;

export const rootSelector = (state: RootState) => (state as any)["question"];

export const listQuestionsSelector = createSelector(
  rootSelector,
  (state) => state
);

export default reducer;
