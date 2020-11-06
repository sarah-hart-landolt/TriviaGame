import { useData, getData, tenRandomTriviaItems } from "./provider.js";

import { triviaItem } from "./triviaItem.js";

import { alert } from "./alert.js";

import { hide, show, setStatusClass, resetState } from "./classHelpers.js";

const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start-btn");
const scoreButton = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const counterElement = document.getElementById("counter");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerStatus = document.getElementById("answerStatus");
const seconds = document.querySelector("#countdown");

// initialize variables
let shuffledTriviaItems = [];
let currentTriviaItemIndex, score, counter;

// fetch the data, then use it (asyncrounous)
getData().then(() => {
  const data = useData();

  let randomArray = [];
  let second = 10;

  const resetSeconds = ()=> {
    second = 10; 
  }

  const countdown = () => {
    seconds.textContent = second + " second" + (second == 1 ? "" : "s");
    if (second-- > 0) setTimeout(countdown, 1000);
    if (seconds.innerText === "0 seconds") {
      disable();
      answerStatus.innerHTML = alert("timesup");
      gameStatusCheck();
    }
  };

  // generate 10 random questions from data, create a new array
  tenRandomTriviaItems(data, randomArray);

  // event listener for when the start button is clicked
  startButton.addEventListener("click", startGame);

  // event listener for when the start the next button is clicked
  nextButton.addEventListener("click", () => {
    //each time it's clicked, add one to the index
    currentTriviaItemIndex++;
    //each time it's clicked, add one to the question counter
    counter++;
    setNextQuestion();
    //hide the div that shows the incorrect/ correct answer from previous question
    answerStatus.classList.add("hide");
  });

  function startGame() {
    // once game has begun, hide the following elements
    hide(startButton);
    hide(scoreButton);
    hide(welcomeScreen);
    hide(answerStatus);
    // shuffle the array of 10 questions to randomize their order
    shuffledTriviaItems = randomArray.sort(() => Math.random() - 0.5);
    // set the following variables initialized above
    currentTriviaItemIndex = 0;
    score = 0;
    counter = 1;
    // show the question and answers
    show(questionContainerElement);
    // set the following question and answers
    setNextQuestion();
  }

 
  function setNextQuestion() {
    // clear the following state of questions/answers/button
    resetState(nextButton, answerButtonsElement);
    // show the question at the incremented index
    showQuestion(shuffledTriviaItems[currentTriviaItemIndex]);
  }

  function disable() {
    Array.from(answerButtonsElement.children).forEach((button) => {
      button.disabled = true;
      setStatusClass(button);
      show(answerStatus);
    });
  }

  const stopSeconds = () => {
    seconds.innerText=second;
    console.log(second)

  }

  function showQuestion(question) {
    // set the question counter to let the user know which question it is of 10
    counterElement.innerText = `Question ${counter}/10`;
    // creates the entire question/ answer setup
    triviaItem(question);
    // adds an event listener to every answer button
    answerButtonsElement.addEventListener("click", selectAnswer);
    answerButtonsElement.addEventListener("click", stopSeconds);

    resetSeconds();
    countdown();
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    // is the selectedButton the correct answer
    const correct = selectedButton.classList.contains("yes");
    // if it's correct, add one to score, set alert to correct
    // if not, shake the button, and alert incorrect
    if (correct) {
      score++;
      answerStatus.innerHTML = alert("correct");
    } else {
      selectedButton.classList.add("shake");

      answerStatus.innerHTML = alert("incorrect");
    }

    show(answerStatus);

    // disable buttons from being selected after the user chose an answer, set the class
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button);
      button.disabled = true;
    });

    gameStatusCheck();
  }

  //if less than 10 questions have been shuffled through, show the next button
  // else, show restart, show the score
  const gameStatusCheck = () => {
    if (shuffledTriviaItems.length > currentTriviaItemIndex + 1) {
      show(nextButton);
    } else {
      startButton.innerText = "Restart";
      scoreButton.innerText = getScore(score);
      show(scoreButton);
      show(startButton);
      hide(welcomeScreen);
    }
  };

  // function to get user's score %
  function getScore(number) {
    return `Your total score: ${(number / 10) * 100}%`;
  }
});
