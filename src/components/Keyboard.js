import React, { useState } from "react";
import { ButtonGroup } from "@material-ui/core";
import Key from "./Key";

const Keyboard = (props) => {
  const { toggle } = props;

  const [letter, setLetter] = useState("");

  const updateLetter = (letter) => {
    setLetter(letter.toUpperCase());
  };

  return (
    <>
      <ButtonGroup>
        <Key letter="Q" toggle={toggle} />
        <Key letter="W" toggle={toggle} />
        <Key letter="E" toggle={toggle} />
        <Key letter="R" toggle={toggle} />
        <Key letter="T" toggle={toggle} />
        <Key letter="Y" toggle={toggle} />
        <Key letter="U" toggle={toggle} />
        <Key letter="I" toggle={toggle} />
        <Key letter="O" toggle={toggle} />
        <Key letter="P" toggle={toggle} />
      </ButtonGroup>
      <ButtonGroup>
        <Key letter="A" toggle={toggle} />
        <Key letter="S" toggle={toggle} />
        <Key letter="D" toggle={toggle} />
        <Key letter="F" toggle={toggle} />
        <Key letter="G" toggle={toggle} />
        <Key letter="H" toggle={toggle} />
        <Key letter="J" toggle={toggle} />
        <Key letter="K" toggle={toggle} />
        <Key letter="L" toggle={toggle} />
      </ButtonGroup>
      <ButtonGroup>
        <Key letter="Z" toggle={toggle} />
        <Key letter="X" toggle={toggle} />
        <Key letter="C" toggle={toggle} />
        <Key letter="V" toggle={toggle} />
        <Key letter="B" toggle={toggle} />
        <Key letter="N" toggle={toggle} />
        <Key letter="M" toggle={toggle} />
      </ButtonGroup>
    </>
  );
};

export default Keyboard;
