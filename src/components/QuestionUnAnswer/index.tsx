import React, { memo, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import useInitial from "../../hooks/useInitial";

type Props = {
  questionId: any;
};

const QuestionUnAnswer = ({ questionId }: Props) => {
  const { users, questions, handleSaveQuestionAnswer, authUser } = useInitial();
  const formRef = useRef<any>();

  const question = (questions as any)[questionId];
  const author = question ? (users as any)[question.author] : null;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const answer = formRef.current.answer.value;
    if (answer !== "") {
      handleSaveQuestionAnswer(authUser, question.id, answer);
    }
  };

  if (!question) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Card bg="light" className="m-3">
      <Card.Header>
        <>
          <Card.Img
            src={author.avatarURL}
            style={{ height: 25, width: 25, marginRight: 15 }}
          />
          {author.name} asks:
        </>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Form.Check
            type="radio"
            id="optionOne"
            value="optionOne"
            label={question.optionOne.text}
            name="answer"
            className="mb-2"
            defaultChecked
          />
          <Form.Check
            type="radio"
            id="optionTwo"
            value="optionTwo"
            label={question.optionTwo.text}
            name="answer"
            className="mb-2"
          />
          <Button
            type="submit"
            className="f-width mt-2"
            variant="outline-success"
          >
            Vote
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default memo(QuestionUnAnswer);
