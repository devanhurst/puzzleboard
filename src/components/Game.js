import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Keyboard from "./Keyboard";
import usedLetterboard from "../usedLetterboard";
import ClipboardContext from "../providers/Clipboard";
import UsedLettersContext, {
  defaultUsedLetters,
} from "../providers/UsedLetters";
import { Grid, Fab } from "@material-ui/core";
import { Puzzle } from "../Puzzle";
import PuzzleImage from "./PuzzleImage";

const Game = (props) => {
  const { category, answer } = props;
  const [puzzle] = useState(new Puzzle(category, answer));
  const [usedLetters, setUsedLetters] = useState(defaultUsedLetters);
  const [lastLetterRevealed, setLastLetterRevealed] = useState("");
  const [clipboard, setClipboard] = useState("");

  useEffect(() => {
    const lastLetterRevealedText = !!lastLetterRevealed
      ? `**Last Pick: ${lastLetterRevealed["letter"]}** (x${lastLetterRevealed["number"]})`
      : "";

    // prettier-ignore
    let textToCopy = puzzle.imageUrl();
    if (!!lastLetterRevealed && lastLetterRevealed["letter"] !== "TOSS UP") {
      textToCopy += `
${usedLetterboard(usedLetters)}
${lastLetterRevealedText}
`;
    }
    setClipboard(textToCopy);
  }, [puzzle, usedLetters, lastLetterRevealed]);

  const toggleLetter = (letterToToggle) => {
    const letters = [...usedLetters];
    const usedLetter = letters.filter(
      (usedLetter) => usedLetter.letter === letterToToggle
    )[0];

    let revealedLetter = null;

    if (!usedLetter.revealed) {
      usedLetter.reveal();
      const numberRevealed = puzzle.reveal(letterToToggle);
      revealedLetter = { letter: letterToToggle, number: numberRevealed };
    } else {
      usedLetter.hide();
      puzzle.hide(letterToToggle);
    }
    setLastLetterRevealed(revealedLetter);
    setUsedLetters(letters);
  };

  const revealRandom = () => {
    puzzle.revealRandom();
    setLastLetterRevealed({ letter: "TOSS UP", number: 1 });
  };

  return (
    <ClipboardContext.Provider value={clipboard}>
      <UsedLettersContext.Provider value={usedLetters}>
        <div height="25%">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PuzzleImage puzzle={puzzle} />
            </Grid>
          </Grid>
        </div>
        <Keyboard toggle={toggleLetter} revealRandom={revealRandom} />
        <CopyToClipboard text={clipboard} onCopy={() => {}}>
          <Fab variant="extended">Copy Puzzle to Clipboard</Fab>
        </CopyToClipboard>
      </UsedLettersContext.Provider>
    </ClipboardContext.Provider>
  );
};

export default Game;
