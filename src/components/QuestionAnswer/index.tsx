import React, { memo } from "react";
import { Card, ListGroup, ProgressBar } from "react-bootstrap";
import useInitial from "../../hooks/useInitial";

type Props = {
  questionId: any;
};

const QuestionAnswer = ({ questionId }: Props) => {
  const { users, questions, authUser } = useInitial();
  const question = (questions as any)[questionId] || null;
  const author = question ? (users as any)[question.author] : null;

  const { optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  const allVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercent = Math.round(
    (optionOne.votes.length / allVotes) * 100
  );
  const optionTwoPercent = Math.round(
    (optionTwo.votes.length / allVotes) * 100
  );

  return (
    <Card bg="light" className="m-3">
      <Card.Header>
        <>
          <Card.Img
            src={avatarURL}
            style={{ height: 25, width: 25, marginRight: 15 }}
          />
          {name} asks:
        </>
      </Card.Header>

      <Card.Body>
        <ListGroup>
          <ListGroup.Item className="position-relative">
            {optionOne.text}
            {optionOne.votes.includes(authUser) ? (
              <div className="ml-2 position-absolute p-label-question">
                Your choice
              </div>
            ) : null}
            <ProgressBar
              now={optionOnePercent}
              label={`${optionOnePercent}%`}
              variant="success"
            />
            <Card.Text className="text-muted">
              {optionOne.votes.length} out of {allVotes} users
            </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item className="position-relative">
            {optionTwo.text}
            {optionTwo.votes.includes(authUser) ? (
              <div className="ml-2 position-absolute p-label-question">
                Your choice
              </div>
            ) : null}
            <ProgressBar
              now={optionTwoPercent}
              label={`${optionTwoPercent}%`}
              variant="success"
            />
            <Card.Text className="text-muted">
              {optionTwo.votes.length} out of {allVotes} users
            </Card.Text>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default memo(QuestionAnswer);
