import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import UsedLetterContext from "../providers/UsedLetters";

const Key = (props) => {
  const { letter, toggle } = props;
  const usedLetters = useContext(UsedLetterContext);

  const usedLetter = usedLetters.filter(
    (usedLetter) => usedLetter.letter === letter
  )[0];
  const color = usedLetter.isVowel() ? "secondary" : "primary";

  const handleClick = () => {
    toggle(letter);
  };

  return (
    <Button
      variant="contained"
      color={usedLetter.revealed ? "default" : color}
      onClick={handleClick}
    >
      {letter}
    </Button>
  );
};

export default Key;
