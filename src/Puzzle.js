export class Puzzle {
  constructor() {
    this.line1 = new Line(12);
    this.line2 = new Line(14);
    this.line3 = new Line(14);
    this.line4 = new Line(12);
  }
}

export class Letter {
  constructor(letter) {
    this.letter = letter;
    this.revealed = false;
  }

  isVowel() {
    return ["A", "E", "I", "O", "U"].includes(this.letter);
  }

  toggle() {
    this.revealed = !this.revealed;
  }
}

export class Blank extends Letter {
  constructor() {
    super(" ");
    this.revealed = true;
  }
}

export class Punctuation extends Letter {
  constructor(letter) {
    super(letter);
    this.revealed = true;
  }
}

export class Line {
  constructor(size) {
    this.size = size;
    this.letters = [];
  }
}
