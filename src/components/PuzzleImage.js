import React from "react";

const PuzzleImage = (props) => {
  const { puzzle } = props;

  return <img src={puzzle.imageUrl("thumb")} alt="puzzleboard" />;
};

export default PuzzleImage;
