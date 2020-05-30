import React, { useState } from 'react';
import Keyboard from './Keyboard';
class Letter {
  constructor(letter) {
    this.letter = letter
    this.revealed = false
  }

  toggle() {
    this.revealed = !this.revealed
  }

  reveal() {
    this.revealed = true
  }

  hide() {
    this.revealed = false
  }
}

class Blank extends Letter {
  constructor() {
    super("+")
    this.revealed = true
  }
}

class Word {
  constructor(letters) {
    this.letters = letters
  }
}

class Line {
  constructor(size) {
    this.size = 12
    this.letters = []
  }
}

const Puzzleboard = (props) => {
  const { category, answer } = props

  const words = answer.split(" ").map(word => new Word(word.split("").map(letter => new Letter(letter))))

  const generateLines = () => {
    const lines = [new Line()]
    words.forEach(word => {
      let currentLine = lines.slice(-1).pop()
      if ( currentLine.letters.length + word.letters.length + 1 > currentLine.size ) {
        lines.push(new Line())
        currentLine = lines.slice(-1).pop()
      }
      if (currentLine.letters.length !== 0) { currentLine.letters.push(new Blank()) }
      word.letters.forEach(letter => currentLine.letters.push(letter))    
    })
    return lines
  }
  
  const [lines, setLines] = useState(generateLines())

  const lineParams = () => {
    const linesAsLetters = lines.map(line => line.letters.map(letter => letter.revealed ? letter.letter : "_"))
    const lineStrings = linesAsLetters.map(line => line.join(''))
    
    let buffer;
    switch(lineStrings.length) {
      case 1:
      case 2:
        buffer = 2
        break;
      default:
        buffer = 1
    }
    
    return lineStrings.map((line, index) => `ln${index + buffer}=${line}`).join('&')
  }

  const revealPuzzle = () => {
    const newLines = [...lines]
    newLines.forEach(line => {
      line.letters.forEach(letter => {
        letter.reveal()
      })
    })
    setLines(newLines)
  }

  const revealOne = (letterToReveal) => {
    const newLines = [...lines]
    const BreakException = {}
    try {
      newLines.forEach(line => {
        line.letters.forEach(letter => {
          if (letter.letter === letterToReveal && !letter.revealed) {
            letter.reveal();
            throw BreakException; 
          }
        })
      })
    } catch (e) {}

    setLines(newLines)
  }

  const revealAll = (letterToReveal) => {
    const newLines = [...lines]
    newLines.forEach(line => {
      line.letters.forEach(letter => {
        if (letter.letter === letterToReveal) { letter.reveal() }
      })
    })
    setLines(newLines)
  }

  const hideAll = (letterToReveal) => {
    const newLines = [...lines]
    newLines.forEach(line => {
      line.letters.forEach(letter => {
        if (letter.letter === letterToReveal) { letter.hide() }
      })
    })
    setLines(newLines)
  }

  const defaultParams = () => (`bg=2&cat=${category}`)
  const thumbnailUrl = () => (`https://www.thewordfinder.com/wof-puzzle-generator/puzzle-thumb.php?${defaultParams()}&${lineParams()}`)
  const puzzleUrl = () => (`https://www.thewordfinder.com/wof-puzzle-generator/puzzle.php?${defaultParams()}&${lineParams()}`)
  
  return (
    <>
      <img src={thumbnailUrl()} alt="puzzleboard" width="500px"/>  
      <p>{puzzleUrl()}</p>
      <Keyboard revealOne={revealOne} revealAll={revealAll} hideAll={hideAll} revealPuzzle={revealPuzzle}/>
    </>
  );
}

export default Puzzleboard;
