import {
  useData,
  getData,
  tenRandomTriviaItems
} from "./provider.js";

import {triviaItem} from "./triviaItem.js"

import {alert} from "./alert.js"

import {hide, show,setStatusClass, resetState } from "./classHelpers.js"

const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start-btn");
const scoreButton = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const counterElement = document.getElementById("counter");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerStatus = document.getElementById("answerStatus");


let shuffledTriviaItems = [];
let currentTriviaItemIndex, score, counter ;


getData().then(() => {
  const data = useData();

  let randomArray = [];

  tenRandomTriviaItems(data, randomArray);

  startButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", () => {
    currentTriviaItemIndex++;
    counter++
    setNextQuestion();
    answerStatus.classList.add("hide");
  });

  
  function startGame() {
    hide(startButton);
    hide(scoreButton);
    hide(welcomeScreen);
    hide(answerStatus);
    shuffledTriviaItems = randomArray.sort(() => Math.random() - 0.5);
    currentTriviaItemIndex = 0;
    score = 0;
    counter = 1;
    show(questionContainerElement);
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState(nextButton, answerButtonsElement);
    showQuestion(shuffledTriviaItems[currentTriviaItemIndex]);
  }

  function showQuestion(question) {
    counterElement.innerText= `Question ${counter}/10`;
      triviaItem(question)
      answerButtonsElement.addEventListener("click", selectAnswer);
  }


  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.classList.contains("yes")

    if (correct) {
      score++;
      console.log(score);
      answerStatus.innerHTML = alert("correct");
    } else {
      selectedButton.classList.add("shake");

      answerStatus.innerHTML = alert("incorrect");
    }
    show(answerStatus);

    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button);
      button.disabled = true

    });
    if (shuffledTriviaItems.length > currentTriviaItemIndex + 1) {
      show(nextButton);
    } else {
      startButton.innerText = "Restart";
      scoreButton.innerText = getScore(score);
      show(scoreButton);
      show(startButton);
      hide(welcomeScreen);
    }
  }

  function getScore(number) {
    return `Your total score: ${(number / 10) * 100}%`;
  }

 
});
