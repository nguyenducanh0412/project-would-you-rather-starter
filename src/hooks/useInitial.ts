import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../rootReducer";
import { initialDataRequest } from "../slices/userSlice";
import { getAuthSuccessfully } from "../slices/authSlice";
import {
  saveQuestionAnswerRequest,
  saveQuestionRequest,
} from "../slices/questionSlice";

const useInitial = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const authUser = useSelector((state: RootState) => state.auth);
  const questions = useSelector((state: RootState) => state.questions);

  const handleInitialData = useCallback(() => {
    dispatch(initialDataRequest());
  }, []);

  const handleLogin = useCallback((userId: string) => {
    dispatch(getAuthSuccessfully(userId));
  }, []);

  const handleSaveQuestion = useCallback((question: any) => {
    dispatch(saveQuestionRequest(question));
  }, []);

  const handleSaveQuestionAnswer = useCallback(
    (authState: any, questionId: any, option: any) => {
      dispatch(
        saveQuestionAnswerRequest({
          authUser: authState,
          qid: questionId,
          answer: option,
        })
      );
    },
    []
  );

  return {
    users: users.data,
    questions: questions.data,
    authUser: authUser.data,
    handleLogin,
    handleInitialData,
    handleSaveQuestion,
    handleSaveQuestionAnswer,
  };
};
export default useInitial;
