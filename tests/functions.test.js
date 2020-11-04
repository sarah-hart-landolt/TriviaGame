const getAllAnswers = require("./mocks");
const shuffleAnswers = require("./mocks");
const tenRandomTriviaItems = require("./mocks");
const triviaItems = require("./mocks");
const getScore = require("./mocks");
const answerButton = require("./mocks");
const triviaItemTest = require("./mocks");



let score = 2;
let randomArray = [];
const triviaItem1 = {
  question: "What was Tandem previous name?",
  incorrect: ["Tandem", "Burger Shack", "Extraordinary Humans"],
  correct: "Devmynd",
};

tenRandomTriviaItems.thirdPlace(triviaItems.fourthPlace, randomArray);

const isArrayUnique = (arr) =>
  Array.isArray(arr) && new Set(arr).size === arr.length; // add function to check that array is unique.

var sampleAnswerArray = [
  "Iacta alea est!",
  "Vidi, vini, vici",
  "Aegri somnia vana",
  "Et tu, Brute?",
];

test("Producing a new answers array from triva item", () => {
  expect(getAllAnswers.secondPlace(triviaItem1)).toStrictEqual([
    "Tandem",
    "Burger Shack",
    "Extraordinary Humans",
    "Devmynd",
  ]);
});

test("Checking that answer array is shuffled", () => {
  expect(shuffleAnswers.firstPlace(sampleAnswerArray)).not.toEqual([
    "Iacta alea est!",
    "Vidi, vini, vici",
    "Aegri somnia vana",
    "Et tu, Brute?",
  ]);
});

test("Ten Trivia Items", () => {
  expect(randomArray.length).toEqual(10);
});

test("Ten Unique Trivia Items", () => {
  expect(isArrayUnique(randomArray)).toBeTruthy();
});

test("Test that score is correct", () => {
  expect(getScore.fifthPlace(score)).toEqual(`Your total score: 20%`);
});

test("Correct answer button renders properly", () => {
  expect(answerButton.sixthPlace("Tandem", triviaItem1)).toEqual( `<button id="answerButton" class="btn no">Tandem</button>`);
});

test("Incorrect answer button renders properly", () => {
  expect(answerButton.sixthPlace("Devmynd", triviaItem1)).toEqual( `<button id="answerButton" class="btn yes">Devmynd</button>`);
});


test("Test that Trivia Item Function returns correct amount of buttons ", () => {
  document.body.innerHTML =
  `<div id="question-container" class="hide">` +
  `<div class="question-font" id="question">Question</div>`+
  `<div id="counter">Counter</div>`+
  `<div id="answer-buttons" class="btn-grid">` +
  `</div>`+
`</div>`

  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");

  triviaItemTest.seventhPlace(triviaItem1, questionElement, answerButtonsElement)
  expect(Array.from(answerButtonsElement.children).length).toEqual(4);
});
