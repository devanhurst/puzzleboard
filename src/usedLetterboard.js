export default (usedLetters) => {
  const consonants = usedLetters.filter((letter) => !letter.isVowel());
  const vowels = usedLetters.filter((letter) => letter.isVowel());
  const unused = (letters) =>
    letters
      .map((letter) => (letter.revealed ? null : letter.letter))
      .filter((letter) => !!letter)
      .join(" ");

  // prettier-ignore
  return(
`
**Consonants Remaining**
${unused(consonants)}
**Vowels Remaining**
${unused(vowels)}
`
  );
};
