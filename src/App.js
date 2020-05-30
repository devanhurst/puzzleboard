import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import styled from "styled-components"
import Puzzleboard from "./Puzzleboard"

const App = () => {
  const [category, setCategory] = useState("TITLE")
  const [answer, setAnswer] = useState("WHEEL OF FORTUNE")

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const Body = styled.div`
    input {
      font-size: 5rem;
    }
    button {
      font-size: 3rem;
    }
  `;

  return (
    <Body>
      <Router>
        <Switch>
          <Route path="/play">
            <Puzzleboard category={category} answer={answer} />
          </Route>
          <Route path="/">
            <h1>Wheel of Fortune Puzzle Manager</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Category:
                <input type="text" placeholder="TITLE" value={category} onChange={(event) => setCategory(event.target.value)} />
              </label>
              <br/>
              <label>
                Puzzle:
                <input type="text" placeholder="WHEEL OF FORTUNE" value={answer} onChange={(event) => setAnswer(event.target.value)} />
              </label>
              <br/>
            </form>
            <NavLink to="/play">
              Start Game
            </NavLink>
          </Route>
        </Switch>
      </Router>
    </Body>
  );
}

export default App;
