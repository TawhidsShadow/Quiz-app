export default function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
}
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentIndex];
}
Quiz.prototype.nextQuestion = function () {
  this.currentIndex++;
}
Quiz.prototype.hasEnded = function () {
  return this.currentIndex === this.questions.length;
}
Quiz.prototype.guess = function (userGuess) {
  const CurrentQuestion = this.questions[this.currentIndex];
  if (CurrentQuestion.isCorrect(userGuess)) {
    this.score++;
  }
  this.nextQuestion();
}
Quiz.prototype.reset = function() {
  this.currentIndex = 0;
  this.score = 0;
}