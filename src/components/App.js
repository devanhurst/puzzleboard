import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Game from "./Game";

const App = () => {
  const [category, setCategory] = useState("TITLE");
  const [answer, setAnswer] = useState("WHEEL OF FORTUNE");

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
            <br />
            <label>
              Puzzle:
              <input
                type="text"
                placeholder="WHEEL OF FORTUNE"
                value={answer}
                onChange={updateAnswer}
              />
            </label>
            <br />
          </form>
          <NavLink to="/puzzleboard/play">Start Game</NavLink>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
