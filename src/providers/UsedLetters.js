import React from "react";
import { Letter } from "../Puzzle";

export const defaultUsedLetters = [
  new Letter("A"),
  new Letter("B"),
  new Letter("C"),
  new Letter("D"),
  new Letter("E"),
  new Letter("F"),
  new Letter("G"),
  new Letter("H"),
  new Letter("I"),
  new Letter("J"),
  new Letter("K"),
  new Letter("L"),
  new Letter("M"),
  new Letter("N"),
  new Letter("O"),
  new Letter("P"),
  new Letter("Q"),
  new Letter("R"),
  new Letter("S"),
  new Letter("T"),
  new Letter("U"),
  new Letter("V"),
  new Letter("W"),
  new Letter("X"),
  new Letter("Y"),
  new Letter("Z"),
];

const UsedLetterContext = React.createContext({});
export default UsedLetterContext;
