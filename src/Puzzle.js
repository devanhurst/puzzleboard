export class Letter {
  constructor(letter) {
    this.letter = letter;
    this.revealed = false;
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

export class Word {
  constructor(letters) {
    this.letters = letters;
  }
}

export class Line {
  constructor() {
    this.size = 12;
    this.letters = [];
  }
}
