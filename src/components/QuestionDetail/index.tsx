import React, { memo } from "react";
import { useParams } from "react-router-dom";
import useInitial from "../../hooks/useInitial";
import QuestionAnswer from "../QuestionAnswer";
import QuestionUnAnswer from "../QuestionUnAnswer";

const QuestionDetail = () => {
  const { users, questions, authUser } = useInitial();
  const { questionId = "" } = useParams();

  const answers = Object.keys((users as any)[authUser].answers);
  const unanswered = answers.includes(questionId);
  const question = (questions as any)[questionId];

  return (
    <>
      {!unanswered ? (
        <QuestionUnAnswer questionId={questionId} />
      ) : (
        <QuestionAnswer questionId={questionId} />
      )}
    </>
  );
};

export default memo(QuestionDetail);
