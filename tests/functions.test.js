const getAllAnswers = require('./testFunctions')
const shuffleAnswers = require('./testFunctions')




const triviaItem1 = {
  question: "What was Tandem previous name?",
  incorrect: ["Tandem", "Burger Shack", "Extraordinary Humans"],
  correct: "Devmynd",
}

var sampleAnswerArray = ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana", "Et tu, Brute?"]

  
test('Producing a new answers array from triva item', () => {
  expect(getAllAnswers.secondPlace(triviaItem1)).toStrictEqual(["Tandem", "Burger Shack", "Extraordinary Humans", "Devmynd"])
})

test('Checking that array is shuffled', () => {
  expect(shuffleAnswers.firstPlace(sampleAnswerArray)).not.toEqual(["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana", "Et tu, Brute?"])
})