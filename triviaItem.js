/*
 This component holds the functions that render the correct questions and shuffled answers 
 of a new trivia item
*/

import {
    shuffleAnswers,
    getAllAnswers
  } from "./provider.js";

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

export const triviaItem = (oneTrivia) => {

    const allAnswers = getAllAnswers(oneTrivia);
    const shuffleAllAnswers = shuffleAnswers(allAnswers);
    questionElement.innerText = oneTrivia.question 
    shuffleAllAnswers.map(answer =>{
        answerButtonsElement.innerHTML += answerButton(answer, oneTrivia)

    })

}

const answerButton = (answer, question) => {
    if(answer === question.correct){
        return `<button id="answerButton" class="btn yes">${answer}</button>`    
    } else {
        return ` <button id="answerButton" class="btn no">${answer}</button>`    

    }
}

