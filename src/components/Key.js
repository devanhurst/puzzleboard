import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import UsedLetterContext from "../providers/UsedLetters";

const Key = (props) => {
  const { letter, toggle } = props;
  const usedLetters = useContext(UsedLetterContext);

  const handleClick = () => {
    toggle(letter);
  };

  const selected = () =>
    usedLetters.filter((usedLetter) => usedLetter.letter === letter)[0]
      .revealed;

  return (
    <Button
      variant="contained"
      color={selected() ? "default" : "primary"}
      onClick={handleClick}
    >
      {letter}
    </Button>
  );
};

export default Key;
