import { all } from "redux-saga/effects";
import watcherUserSaga from "./userSaga";

export default function* rootSaga() {
  yield all([watcherUserSaga()]);
}
