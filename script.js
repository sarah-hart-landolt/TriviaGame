import {
  useData,
  getData,
  shuffleAnswers,
  getAllAnswers,
  tenRandomTriviaItems,
} from "./provider.js";

import {alert} from "./alert.js"

const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start-btn");
const scoreButton = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const counterElement = document.getElementById("counter");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerStatus = document.getElementById("answerStatus");

const hide = (variableName) => {
  variableName.classList.add("hide");
};
const show = (variableName) => {
  variableName.classList.remove("hide");
};


let shuffledQuestions = [];
let currentQuestionIndex, score, counter ;


getData().then(() => {
  const data = useData();

  let randomArray = [];

  tenRandomTriviaItems(data, randomArray);

  startButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    counter++
    setNextQuestion();
    answerStatus.classList.add("hide");
  });

  
  function startGame() {
    hide(startButton);
    hide(scoreButton);
    hide(welcomeScreen);
    hide(answerStatus);
    shuffledQuestions = randomArray.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    counter = 1;
    show(questionContainerElement);
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    counterElement.innerText= `Question ${counter}/10`;
    const allAnswers = getAllAnswers(question);
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
    hide(nextButton);
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsElement.children).forEach((button) => {
      button.disabled = true
    });

    if (correct) {
      score++;
      console.log(score);
      answerStatus.innerHTML = alert("correct");
    } else {
      selectedButton.classList.add("shake");
      answerStatus.innerHTML = alert("incorrect");
    }
    show(answerStatus);

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
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
});
