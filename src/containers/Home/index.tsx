import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import QuestionList from "../../components/QuestionList";
import useInitial from "../../hooks/useInitial";

const Home = () => {
  const { users, questions, authUser } = useInitial();
  const answeredLists = Object.keys((users as any)[authUser].answers);

  const listAnswers = Object.values(questions)
    .filter((question: any) => answeredLists.includes(question.id))
    .sort((a: any, b: any) => b.timestamp - a.timestamp);

  const listUnAnswers = Object.values(questions)
    .filter((question: any) => !answeredLists.includes(question.id))
    .sort((a: any, b: any) => b.timestamp - a.timestamp);

  return (
    <>
      <Tabs>
        <Tab eventKey="unanswered" title="Unanswered Questions">
          {listUnAnswers.map((question: any) => (
            <QuestionList key={uuidv4()} questionId={question.id} />
          ))}
        </Tab>
        <Tab eventKey="answered" title="Answered Questions">
          {listAnswers.map((question: any) => (
            <QuestionList key={uuidv4()} questionId={question.id} />
          ))}
        </Tab>
      </Tabs>
    </>
  );
};

export default Home;
