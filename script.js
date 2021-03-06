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
const timer = document.getElementById("timer")

// initialize variables
let shuffledTriviaItems = [];
let currentTriviaItemIndex, score, counter;

// fetch the data, then use it (asyncrounous)
getData().then(() => {
  const data = useData();

  let randomArray = [];
  var c = 10;
  var t;
  var timer_is_on = 0;

function timedCount() {
  timer.value = c;

  if(c>0){
    c = c - 1;
  } else {
    clearTimeout(t);
    timer_is_on= 1
      disable();
      answerStatus.innerHTML = alert("times up")
      gameStatusCheck();
     
    }
  
  t = setTimeout(timedCount, 1000);
  

}


function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
     timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = 0;
}

function disable() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
    setStatusClass(button);
    show(answerStatus);
  });
}

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
    timer.classList.add("countdown")
    c=10;

    timer.classList.remove("countdown-stop")

    // show the question at the incremented index
    showQuestion(shuffledTriviaItems[currentTriviaItemIndex]);
    startCount();



  }

 

  

  function showQuestion(question) {
    // set the question counter to let the user know which question it is of 10
    counterElement.innerText = `Question ${counter}/10`;
    // creates the entire question/ answer setup
    triviaItem(question);
    // adds an event listener to every answer button
    answerButtonsElement.addEventListener("click", selectAnswer);
  

    // countdown();
  }

 

  function selectAnswer(e) {
    const selectedButton = e.target;
    stopCount()
    timer.classList.remove("countdown")

    timer.classList.add("countdown-stop")

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
