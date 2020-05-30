import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { TextField, Fab } from "@material-ui/core";
import Game from "./Game";

const App = () => {
  const [category, setCategory] = useState("");
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
        <Route path="/play">
          <Game category={category} answer={answer} />
        </Route>
        <Route path="/">
          <h1>Wheel of Fortune Puzzle Manager</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              label="Category"
              variant="outlined"
              maxLength={20}
              placeholder="THING"
              value={category}
              onChange={updateCategory}
            />
            <br />
            <br />
            <TextField
              label="Line 1"
              variant="outlined"
              maxLength={12}
              placeholder="12 LETTERS MAX"
              value={answer[1]}
              onChange={(event) => updateAnswer(event.target.value, 1)}
            />
            <br />
            <TextField
              label="Line 2"
              variant="outlined"
              maxLength={14}
              placeholder="14 LETTERS MAX"
              value={answer[2]}
              onChange={(event) => updateAnswer(event.target.value, 2)}
            />{" "}
            <br />
            <TextField
              label="Line 3"
              variant="outlined"
              maxLength={14}
              placeholder="14 LETTERS MAX"
              value={answer[3]}
              onChange={(event) => updateAnswer(event.target.value, 3)}
            />
            <br />
            <TextField
              label="Line 4"
              variant="outlined"
              maxLength={12}
              placeholder="12 LETTERS MAX"
              value={answer[4]}
              onChange={(event) => updateAnswer(event.target.value, 4)}
            />
          </form>
          <br />
          <NavLink to="/play">
            <Fab variant="extended">Start Game</Fab>
          </NavLink>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
