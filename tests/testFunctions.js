const getAllAnswers = (triviaObject) => {
    let allAnswers = [];
    var inCorrectArray = triviaObject.incorrect.filter((incorrect) => incorrect);
    inCorrectArray.push(triviaObject.correct);
    allAnswers.push(inCorrectArray);
    const allAnswersFlat = allAnswers.flat();
    return allAnswersFlat;
  };

const shuffleAnswers = (answerArray) => {
    return answerArray.sort(() => Math.random() - 0.5);
  };


module.exports.firstPlace = shuffleAnswers
module.exports.secondPlace = getAllAnswers
