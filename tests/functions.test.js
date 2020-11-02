const getAllAnswers = require('./testFunctions')
const shuffleAnswers = require('./testFunctions')
const tenRandomTriviaItems = require('./testFunctions')
const triviaItems = require('./testFunctions')
const getScore = require('./testFunctions')


let score = 2
let randomArray = []
const triviaItem1 = {
  question: "What was Tandem previous name?",
  incorrect: ["Tandem", "Burger Shack", "Extraordinary Humans"],
  correct: "Devmynd",
}

tenRandomTriviaItems.thirdPlace(triviaItems.fourthPlace, randomArray)

const isArrayUnique = arr => Array.isArray(arr) && new Set(arr).size === arr.length; // add function to check that array is unique.


var sampleAnswerArray = ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana", "Et tu, Brute?"]

  
test('Producing a new answers array from triva item', () => {
  expect(getAllAnswers.secondPlace(triviaItem1)).toStrictEqual(["Tandem", "Burger Shack", "Extraordinary Humans", "Devmynd"])
})

test('Checking that array is shuffled', () => {
  expect(shuffleAnswers.firstPlace(sampleAnswerArray)).not.toEqual(["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana", "Et tu, Brute?"])
})

test('Ten Trivia Items', ()=> {
  expect(randomArray.length).toEqual(10) })

test('Ten Unique Trivia Items', ()=> {
  expect(isArrayUnique(randomArray)).toBeTruthy();
})

test('Test that score is correct', ()=> {
  expect(getScore.fifthPlace(score)).toEqual(`Your total score: 20%`)
})