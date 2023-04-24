import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

export function getInitialData(): Promise<{ users: any; questions: any }> {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(question: any): any {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(
  authedUser: any,
  qid: any,
  answer: any
): any {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}
