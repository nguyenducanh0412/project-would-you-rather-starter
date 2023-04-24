import React, { memo } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useInitial from "../../hooks/useInitial";

type Props = {
  questionId: any;
};

const QuestionList = ({ questionId }: Props) => {
  const { users, questions } = useInitial();

  const question = (questions as any)[questionId];
  const user = (users as any)[question.author];

  return (
    <Card bg="light" className="m-3">
      <Card.Header>
        <>
          <Card.Img
            src={user.avatarURL}
            style={{ height: 25, width: 25, marginRight: 15 }}
          />
          {user.name} asks:
        </>
      </Card.Header>
      <Card.Body>
        <Card.Text>{question.optionOne.text}...</Card.Text>
        <Link to={`/questions/${question.id}`}>
          <Button variant="outline-success" className="f-width">View Question</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default memo(QuestionList);
