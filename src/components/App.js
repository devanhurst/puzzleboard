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
  const [answer, setAnswer] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const updateCategory = (event) => {
    setCategory(event.target.value.toUpperCase());
  };

  const updateAnswer = (value, line) => {
    const newAnswer = { ...answer };
    newAnswer[line] = value.toUpperCase();
    setAnswer(newAnswer);
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
                maxLength={20}
                placeholder="TITLE"
                value={category}
                onChange={updateCategory}
              />
            </label>
            <label>
              Puzzle:
              <input
                type="text"
                maxLength={12}
                placeholder="LINE ONE"
                value={answer.line1}
                onChange={(event) => updateAnswer(event.target.value, 1)}
              />
              <input
                type="text"
                maxLength={14}
                placeholder="LINE TWO"
                value={answer.line2}
                onChange={(event) => updateAnswer(event.target.value, 2)}
              />
              <input
                type="text"
                maxLength={14}
                placeholder="LINE THREE"
                value={answer.line3}
                onChange={(event) => updateAnswer(event.target.value, 3)}
              />
              <input
                type="text"
                maxLength={12}
                placeholder="LINE FOUR"
                value={answer.line4}
                onChange={(event) => updateAnswer(event.target.value, 4)}
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
