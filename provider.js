/*
 This component:
 1) fetches the data froms JSON and parses it
 2) has functions to be exported that properly manipulate that data (select 10 random, create an answer array)
*/

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

export const tenRandomTriviaItems = (originalArray, newRandomArray)=> {
  for (let i = 0; i < 10; i++) {
    const random_index = [Math.floor(Math.random() * originalArray.length)];
    const randomData = originalArray[random_index];
    newRandomArray.push(randomData);
    originalArray.splice(random_index, 1);
  }
}



