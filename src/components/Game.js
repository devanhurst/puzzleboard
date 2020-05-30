import React, { useState } from "react";
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

  // prettier-ignore
  const textToCopy = () =>
`
${puzzle.imageUrl()}
${usedLetterboard(usedLetters)}
`;

  const toggleLetter = (letterToToggle) => {
    const letters = [...usedLetters];
    const usedLetter = letters.filter(
      (usedLetter) => usedLetter.letter === letterToToggle
    )[0];
    usedLetter.toggle();
    if (usedLetter.revealed) {
      puzzle.reveal(letterToToggle);
    } else {
      puzzle.hide(letterToToggle);
    }
    setUsedLetters(letters);
    setClipboard(textToCopy());
  };

  const [clipboard, setClipboard] = useState(textToCopy());

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
        <Keyboard toggle={toggleLetter} />
        <CopyToClipboard text={clipboard} onCopy={() => {}}>
          <Fab variant="extended">Copy Puzzle to Clipboard</Fab>
        </CopyToClipboard>
      </UsedLettersContext.Provider>
    </ClipboardContext.Provider>
  );
};

export default Game;
