import React, { useState } from "react";
import Keyboard from "./Keyboard";
import { Letter, Blank, Punctuation, Word, Line } from "../Puzzle";
import UsedLetterboard from "./UsedLetterboard";
import UsedLettersContext, {
  defaultUsedLetters,
} from "../providers/UsedLetters";

const Game = (props) => {
  const { category, answer } = props;
  const [usedLetters, setUsedLetters] = useState(defaultUsedLetters);

  const toggleLetter = (letterToReveal) => {
    const letters = [...usedLetters];
    letters
      .filter((usedLetter) => usedLetter.letter === letterToReveal)[0]
      .toggle();
    setUsedLetters(letters);
  };

  const defaultParams = () => `bg=2&cat=${encodeURIComponent(category)}`;
  // const thumbnailUrl = () =>
  //   `https://www.thewordfinder.com/wof-puzzle-generator/puzzle-thumb.php?${defaultParams()}&${lineParams()}`;
  const puzzleUrl = () =>
    `https://www.thewordfinder.com/wof-puzzle-generator/puzzle.php?${defaultParams()}`;

  return (
    <UsedLettersContext.Provider value={usedLetters}>
      <pre>
        {puzzleUrl()}
        <UsedLetterboard />
      </pre>
      <Keyboard toggle={toggleLetter} />
    </UsedLettersContext.Provider>
  );
};

export default Game;
