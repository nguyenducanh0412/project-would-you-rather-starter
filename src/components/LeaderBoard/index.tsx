import React, { memo, useMemo } from "react";
import { Card } from "react-bootstrap";
import useInitial from "../../hooks/useInitial";

const LeaderBoard = () => {
  const { users } = useInitial();

  const leaderBoard = useMemo(
    () =>
      Object.values(users)
        .map((user: any) => ({
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answerTotal: Object.keys(user.answers).length,
          questionTotal: user.questions.length,
          total: Object.keys(user.answers).length + user.questions.length,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3),
    [users]
  );

  const colorArray = useMemo(() => ["#FA7D2C", "#429BBC", "#552D72"], []);
  return (
    <>
      {leaderBoard.map(
        ({ id, name, avatarURL, answerTotal, questionTotal, total }, index) => (
          <Card bg="light" className="m-3" key={id}>
            <Card.Header className="d-flex justify-content-between">
              <div>
                <Card.Img
                  src={avatarURL}
                  style={{ height: 25, width: 25, marginRight: 15 }}
                />
                {name}
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: colorArray[index],
                  color: "white",
                  borderRadius: 50,
                  width: 30,
                  height: 30,
                }}
              >
                {index + 1}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Answered Questions: {answerTotal}
                <br />
                Created Questions: {questionTotal}
              </Card.Text>
            </Card.Body>
            <Card.Footer>Score: {total}</Card.Footer>
          </Card>
        )
      )}
    </>
  );
};

export default memo(LeaderBoard);
