import React, { memo, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import useInitial from "../../hooks/useInitial";
import "./styles.scss";

const Login = () => {
  const { users, handleLogin } = useInitial();
  const navigate = useNavigate();
  const optionRef = useRef("");

  const listUsers = Object.keys(users).map((id: string) => ({
    value: id,
    label: (users as any)[id].name,
  }));

  const handleChangeOption = (event: React.FormEvent<HTMLSelectElement>) => {
    optionRef.current = event.currentTarget.value;
  };

  const handleSignIn = () => {
    handleLogin(optionRef.current);
    const query = new URLSearchParams(window.location.search);
    const params = query.get("url") || "/";
    navigate(params);
  };

  return (
    <Card className="mt-3 login-container">
      <Card.Header className="text-center">
        <h5>
          <b>Welcome to the Would You Rather App!</b>
        </h5>
        <div>Please sign in to continue</div>
      </Card.Header>
      <Card.Body>
        <Card.Img
          src={logo}
          style={{
            height: 200,
            width: 200,
            display: "block",
            margin: "0 auto",
          }}
        />
        <Card.Text
          style={{ color: "#64a39c", fontWeight: 600, textAlign: "center" }}
        >
          Sign In
        </Card.Text>
        <Form.Select
          aria-label="Default select example"
          onChange={handleChangeOption}
        >
          <option>Select User</option>
          {listUsers.map((lstUser: { value: string; label: string }) => (
            <option value={lstUser.value} key={lstUser.value}>
              {lstUser.label}
            </option>
          ))}
        </Form.Select>
        <Button
          className="mt-2 f-width"
          variant="success"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Card.Body>
    </Card>
  );
};

export default memo(Login);
