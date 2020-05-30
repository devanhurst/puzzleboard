import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Keyboard from "./Keyboard";
import usedLetterboard from "../usedLetterboard";
import ClipboardContext from "../providers/Clipboard";
import UsedLettersContext, {
  defaultUsedLetters,
} from "../providers/UsedLetters";
import { Grid, Fab } from "@material-ui/core";

const Game = (props) => {
  const { category, answer } = props;
  const [usedLetters, setUsedLetters] = useState(defaultUsedLetters);

  // prettier-ignore
  const textToCopy = () =>
`
${puzzleUrl()}
${usedLetterboard(usedLetters)}
`;

  const toggleLetter = (letterToReveal) => {
    const letters = [...usedLetters];
    letters
      .filter((usedLetter) => usedLetter.letter === letterToReveal)[0]
      .toggle();
    setUsedLetters(letters);
    setClipboard(textToCopy());
  };

  const defaultParams = () => `bg=2&cat=${encodeURIComponent(category)}`;
  const thumbnailUrl = () =>
    `https://www.thewordfinder.com/wof-puzzle-generator/puzzle-thumb.php?${defaultParams()}`;
  const puzzleUrl = () =>
    `https://www.thewordfinder.com/wof-puzzle-generator/puzzle.php?${defaultParams()}`;

  const [clipboard, setClipboard] = useState(textToCopy());

  return (
    <ClipboardContext.Provider value={clipboard}>
      <UsedLettersContext.Provider value={usedLetters}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img width="100%" src={thumbnailUrl()} alt="puzzleboard" />
          </Grid>
        </Grid>
        <Keyboard toggle={toggleLetter} />
        <CopyToClipboard text={clipboard} onCopy={() => {}}>
          <Fab variant="extended">Copy Puzzle to Clipboard</Fab>
        </CopyToClipboard>
      </UsedLettersContext.Provider>
    </ClipboardContext.Provider>
  );
};

export default Game;
