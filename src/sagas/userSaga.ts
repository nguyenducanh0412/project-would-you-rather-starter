import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { getInitialData, saveQuestion, saveQuestionAnswer } from "../services";
import {
  addAnswerToQuestionSuccessfully,
  getListQuestionsSuccessfully,
  saveQuestionAnswerRequest,
  saveQuestionRequest,
  saveQuestionSuccessfully,
} from "../slices/questionSlice";
import {
  addAnswerToUserSuccessfully,
  addQuestionToUserSuccessfully,
  getListUsersSuccessfully,
  initialDataRequest,
} from "../slices/userSlice";

export function* initData() {
  try {
    const { users, questions } = yield call(getInitialData);
    yield put(getListUsersSuccessfully(users));
    yield put(getListQuestionsSuccessfully(questions));
  } catch (error: any) {
    const { message = "Something went wrong!" } = error;
    console.log(message);
  }
}

export function* saveQuestionWorker({ payload }: PayloadAction) {
  try {
    const { questionRes } = yield call(saveQuestion, payload);
    yield put(saveQuestionSuccessfully(questionRes));
    yield put(addQuestionToUserSuccessfully(questionRes));
  } catch (error: any) {
    const { message = "Something went wrong!" } = error;
    console.log(message);
  }
}

export function* saveQuestionAnswerWorker({ payload }: any) {
  try {
    const { authUser, qid, answer } = payload;
    const { users, questions } = yield call(
      saveQuestionAnswer,
      authUser,
      qid,
      answer
    );

    yield put(addAnswerToQuestionSuccessfully({ authUser, qid, answer }));
    yield put(addAnswerToUserSuccessfully({ authUser, qid, answer }));
  } catch (error: any) {
    const { message = "Something went wrong!" } = error;
    console.log(message);
  }
}

export default function* watcherUserSaga() {
  yield takeEvery(initialDataRequest.type, initData);
  yield takeEvery(saveQuestionRequest.type, saveQuestionWorker);
  yield takeEvery(saveQuestionAnswerRequest.type, saveQuestionAnswerWorker);
}
