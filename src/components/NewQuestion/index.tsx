import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useInitial from "../../hooks/useInitial";

const NewQuestion = () => {
  const { authUser, handleSaveQuestion } = useInitial();
  const navigate = useNavigate();
  const [optionValue, setValueOption] = useState<{
    optionOne: string;
    optionTwo: string;
  }>({
    optionOne: "",
    optionTwo: "",
  });
  const { optionOne, optionTwo } = optionValue;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const question = {
      author: authUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    };
    handleSaveQuestion(question);
    setValueOption({
      optionOne: "",
      optionTwo: "",
    });
    navigate("/");
  };
  const handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setValueOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Card bg="light" className="m-3 text-center">
        <Card.Header className="p-3">
          <h4>
            <b>Add New Question</b>
          </h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="optionOne">
              <Form.Control
                type="text"
                name="optionOne"
                placeholder="Enter Option One Text Here"
                value={optionOne}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <h4>
              <small>OR</small>
            </h4>
            <Form.Group controlId="optionTwo">
              <Form.Control
                type="text"
                name="optionTwo"
                placeholder="Enter Option Two Text Here"
                value={optionTwo}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              className="mt-2 f-width"
              disabled={optionOne === "" || optionTwo === ""}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewQuestion;
