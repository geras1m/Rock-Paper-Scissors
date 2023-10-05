class Winner {
  static checkResultForHelpTable(movesArr, pcAnswer, userAnswer) {
    let parsedResult;
    const result = this.check(movesArr, pcAnswer, userAnswer);
    if (result === 1) {
      parsedResult = 'Win';
    } else if (result === 0) {
      parsedResult = 'Draw';
    } else {
      parsedResult = 'Lose';
    }
    return parsedResult;
  }

  static consoleResultOfMoves(movesArr, pcAnswer, userAnswer) {
    const result = this.check(movesArr, pcAnswer, userAnswer);
    if (result === 1) {
      console.log('User win!');
    } else if (result === 0) {
      console.log("It's a draw!");
    } else {
      console.log("You've lost!");
    }
  }

  static check(movesArr, pcAnswer, userAnswer) {
    const mid = Math.floor(movesArr.length / 2);
    const pcAnswerIndex = movesArr.indexOf(pcAnswer);
    const userAnswerIndex = movesArr.indexOf(userAnswer);
    const winHalfOfArr = [...movesArr, ...movesArr].splice(pcAnswerIndex + 1, mid);

    if (pcAnswerIndex === userAnswerIndex) {
      return 0
    } else if (winHalfOfArr.includes(userAnswer)) {
      return 1
    } else {
      return -1
    }
  }
}

export default Winner;
