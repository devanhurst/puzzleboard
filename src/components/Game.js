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

  const words = answer
    .split(" ")
    .map(
      (word) => new Word(word.split("").map((letter) => new Letter(letter)))
    );

  const generateLines = () => {
    const lines = [new Line()];
    words.forEach((word) => {
      let currentLine = lines.slice(-1).pop();

      if (
        currentLine.letters.length + word.letters.length + 1 <=
        currentLine.size
      ) {
        currentLine.letters.push(new Blank());
      } else if (currentLine.letters.length !== 0) {
        lines.push(new Line());
        currentLine = lines.slice(-1).pop();
      }

      word.letters.forEach((letter) => currentLine.letters.push(letter));
    });
    return lines;
  };

  const [lines, setLines] = useState(generateLines());

  const lineParams = () => {
    const linesAsLetters = lines.map((line) =>
      line.letters.map((letter) =>
        letter.revealed ? encodeURIComponent(letter.letter) : "_"
      )
    );
    const lineStrings = linesAsLetters.map((line) => line.join(""));

    let buffer;
    switch (lineStrings.length) {
      case 1:
      case 2:
        buffer = 2;
        break;
      default:
        buffer = 1;
    }

    return lineStrings
      .map((line, index) => `ln${index + buffer}=${line}`)
      .join("&");
  };

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
    `https://www.thewordfinder.com/wof-puzzle-generator/puzzle.php?${defaultParams()}&${lineParams()}`;

  return (
    <UsedLettersContext.Provider value={usedLetters}>
      <p>{puzzleUrl()}</p>
      <UsedLetterboard />
      <Keyboard toggle={toggleLetter} />
    </UsedLettersContext.Provider>
  );
};

export default Game;
