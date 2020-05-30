export class Puzzle {
  constructor(category, answer) {
    this.category = category;
    this.letters = [];
    this.answer = Object.keys(answer)
      .map((lineNumber) => answer[lineNumber])
      .join(" ");

    Object.keys(answer).forEach((lineNumber) => {
      answer[lineNumber]
        .split("")
        .forEach((letter) =>
          this.letters.push(this.buildLetter(letter.toUpperCase(), lineNumber))
        );
    });
  }

  buildLetter(letter, lineNumber) {
    if (letter.match(/[A-Z]/)) {
      return new Letter(letter, lineNumber);
    } else if (letter === " ") {
      return new Space(letter, lineNumber);
    } else {
      return new Punctuation(letter, lineNumber);
    }
  }

  imageUrl(size) {
    const url = "https://www.thewordfinder.com/wof-puzzle-generator";
    const path = size === "thumb" ? "puzzle-thumb.php" : "puzzle.php";
    const defaultParams = "?bg=2";
    const category = `&cat=${encodeURIComponent(this.category)}`;
    const puzzle = this.puzzleParams();

    return `${url}/${path}${defaultParams}${category}${puzzle}`;
  }

  puzzleParams() {
    return (
      this.lineParams("1") +
      this.lineParams("2") +
      this.lineParams("3") +
      this.lineParams("4")
    );
  }

  lineParams(lineNumber) {
    const letters = this.letters
      .filter((letter) => letter.line === lineNumber)
      .map((letter) => encodeURIComponent(letter.display()))
      .join("");

    return letters.length > 0 ? `&ln${lineNumber}=${letters}` : "";
  }

  reveal(letterToReveal) {
    this.letters.forEach((letter) => {
      if (letter.letter === letterToReveal) {
        letter.reveal();
      }
    });
  }

  hide(letterToHide) {
    this.letters.forEach((letter) => {
      if (letter.letter === letterToHide) {
        letter.hide();
      }
    });
  }
}

export class Letter {
  constructor(letter, line) {
    this.letter = letter;
    this.line = line;
    this.revealed = false;
  }

  isVowel() {
    return ["A", "E", "I", "O", "U"].includes(this.letter);
  }

  reveal() {
    this.revealed = true;
  }

  hide() {
    this.revealed = false;
  }

  toggle() {
    this.revealed = !this.revealed;
  }

  display() {
    return this.revealed ? this.letter : "_";
  }
}

export class Space extends Letter {
  constructor(letter, line) {
    super(" ", line);
    this.revealed = true;
  }
}

export class Punctuation extends Letter {
  constructor(letter, line) {
    super(letter, line);
    this.revealed = true;
  }
}
