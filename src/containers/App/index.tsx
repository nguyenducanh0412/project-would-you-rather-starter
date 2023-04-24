import React, { memo, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../components/NotFound";
import LeaderBoard from "../../components/LeaderBoard";
import Login from "../../components/Login";
import Navbar from "../../components/Navbar";
import NewQuestion from "../../components/NewQuestion";
import PrivateRoute from "../../components/PrivateRoute";
import QuestionDetail from "../../components/QuestionDetail";
import useInitial from "../../hooks/useInitial";
import Home from "../Home";
import "./styles.scss";

function App() {
  const { handleInitialData } = useInitial();

  useEffect(() => {
    handleInitialData();
  }, []);

  return (
    <div className="p-container">
      <Navbar />
      <div className="p-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute component={Home} />} />
          <Route
            path="/add"
            element={<PrivateRoute component={NewQuestion} />}
          />
          <Route
            path="/questions/:questionId"
            element={<PrivateRoute component={QuestionDetail} />}
          />
          <Route
            path="/leaderboard"
            element={<PrivateRoute component={LeaderBoard} />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default memo(App);
