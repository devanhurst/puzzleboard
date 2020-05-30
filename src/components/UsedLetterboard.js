import React, { useContext } from "react";
import UsedLetterContext from "../providers/UsedLetters";

const UsedLetterboard = (props) => {
  const usedLetters = useContext(UsedLetterContext);
  const usedString = usedLetters
    .map((letter) => (letter.revealed ? null : letter.letter))
    .filter((letter) => !!letter)
    .join(" ");
  return (
    <pre>
      ** Letters Remaining **
      {usedString}
    </pre>
  );
};

export default UsedLetterboard;
