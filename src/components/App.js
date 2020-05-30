import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Game from "./Game";
import { Puzzle } from "../Puzzle.js";

const App = () => {
  const [category, setCategory] = useState("TITLE");
  const [answer, setAnswer] = useState(new Puzzle());

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const updateCategory = (event) => {
    setCategory(event.target.value.toUpperCase());
  };

  const updateAnswer = (event) => {
    setAnswer(event.target.value.toUpperCase());
  };

  return (
    <Router>
      <Switch>
        <Route path="/puzzleboard/play">
          <Game category={category} answer={answer} />
        </Route>
        <Route path="/puzzleboard">
          <h1>Wheel of Fortune Puzzle Manager</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Category:
              <input
                type="text"
                placeholder="TITLE"
                value={category}
                onChange={updateCategory}
              />
            </label>
            <label>
              Puzzle:
              <input
                type="text"
                placeholder="LINE 1"
                value={answer.line1}
                onChange={updateAnswer}
              />
              <input
                type="text"
                placeholder="LINE TWO"
                value={answer.line2}
                onChange={updateAnswer}
              />
              <input
                type="text"
                placeholder="LINE THREE"
                value={answer.line3}
                onChange={updateAnswer}
              />
              <input
                type="text"
                placeholder="LINE FOUR"
                value={answer.line4}
                onChange={updateAnswer}
              />
            </label>
          </form>
          <NavLink to="/puzzleboard/play">Start Game</NavLink>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
