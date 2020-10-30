let data = []

export const getData = () => {
  return fetch("./data/data.json")
  .then(response => response.json())
  .then(
      parsedData => {
          console.table(parsedData)
           data = parsedData
        }
  )
}


export const useData = () => data.slice();

getData().then(()=> {
  const result = useData()
  console.log(result)
  }
  )

export const getAllAnswers = (triviaObject) => {
  let allAnswers = [];
  var inCorrectArray = triviaObject.incorrect.filter((incorrect) => incorrect);
  inCorrectArray.push(triviaObject.correct);
  allAnswers.push(inCorrectArray);
  const allAnswersFlat = allAnswers.flat();
  return allAnswersFlat;
};

 export const shuffleAnswers = (answerArray) => {
  return answerArray.sort(() => Math.random() - 0.5);
};



