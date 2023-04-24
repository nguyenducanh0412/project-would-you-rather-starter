import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import questionReducer from "./slices/questionSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  users: userReducer,
  questions: questionReducer,
  auth: authReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
