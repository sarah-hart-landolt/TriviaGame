import { useData } from "./provider.js";
import { shuffleAnswers } from "./provider.js";
import { getAllAnswers } from "./provider.js";

const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start-btn");
const scoreButton = document.getElementById("score-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerStatus = document.getElementById("answerStatus");

let shuffledQuestions= []
let currentQuestionIndex=0
let score = 0

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
  answerStatus.classList.add("hide");
});
const data = useData();

const addClass = (variableName) => {
  variableName.classList.add("hide");
};
const removeClass = (variableName) => {
  variableName.classList.remove("hide");
};

function startGame() {
  addClass(startButton);
  addClass(scoreButton);
  addClass(welcomeScreen);
  addClass(answerStatus);
  shuffledQuestions = data.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  removeClass(questionContainerElement);
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}



function showQuestion(question) {
  questionElement.innerText = question.question;
  const allAnswers= getAllAnswers(question)
  const shuffleAllAnswers = shuffleAnswers(allAnswers);

  for (let i = 0; i < shuffleAllAnswers.length; i++) {
    const button = document.createElement("button");
    button.innerText = shuffleAllAnswers[i];
    console.log(shuffleAllAnswers[i]);
    button.classList.add("btn");
    if (shuffleAllAnswers[i] === question.correct) {
      button.dataset.correct = shuffleAllAnswers[i];
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  }
}

function resetState() {
  clearStatusClass(document.body);
  addClass(nextButton);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
    console.log(score);
    answerStatus.innerText = "Correct Answer! Good Job!";
  } else {
    answerStatus.innerText =
      "Incorrect Answer. You should do better! Shame on you!";
  }
  removeClass(answerStatus);

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    removeClass(nextButton);
  } else {
    startButton.innerText = "Restart";
    scoreButton.innerText = getScore();
    removeClass(scoreButton);
    removeClass(startButton);
    addClass(welcomeScreen);
  }
}

function getScore() {
  return `Your total score: ${(score / 10) * 100}%`;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
