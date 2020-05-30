import React, { useState } from 'react';

const Keyboard = (props) => {
  const { revealOne, revealAll, revealPuzzle, hideAll } = props;

  const [letter, setLetter] = useState("")

  const updateLetter = (letter) => {
    setLetter(letter.toUpperCase())
  }

  return(
    <>
      <input placeholder="?" maxLength="1" style={{width: "1em"}} value={letter} onChange={(event) => updateLetter(event.target.value)}/>
      <br/>
      <button onClick={() => {revealOne(letter)}}>{`Reveal One ${letter}`}</button>
      <br/>
      <button onClick={() => {revealAll(letter)}}>{`Reveal Each ${letter}`}</button>
      <br/>
      <button onClick={() => {hideAll(letter)}}>{`Hide Each ${letter}`}</button>
      <br/>
      <button onClick={revealPuzzle}>Reveal Puzzle</button>
    </>
  )
}

export default Keyboard;