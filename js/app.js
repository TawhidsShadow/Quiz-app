import Question from "./question.js";
import Quiz from "./quiz.js";

const app = (function() {
// cache the dom
const quizEl= document.querySelector('.jabquiz');
const quizQuestionEl = document.querySelector('.jabquiz__question');
const trackeEl = document.querySelector('.jabquiz__tracker');
const taglineEl = document.querySelector('.jabquiz__tagline');
const choicesEl = document.querySelector('.jabquiz__choices');
const progressInnerEL = document.querySelector('.progress__inner');
const nextButtonEl = document.querySelector('.next');
const restartButtonEl = document.querySelector('.restart');

const q1 = new Question(
  'First person of US?',
  ['Barrack','Osama', 'Mohammed', 'Abdullah'],
  2
)
const q2 = new Question(
  'When was javaScript created?',
  ['June 1995','May 1995', 'July 1885', 'Sep 1996'],
  1
)
const q3 = new Question(
  'What does css stand for?',
  ['County Sherif Service','Cascading Sexy Sheets', 'Cascading Style Sheets', 'Abdullah'],
  2
)
const q4 = new Question(
  'The full form of HTML?',
  ['Hyper Text Makup Language','Osama', 'Mohammed', 'Abdullah'],
  0
)
const q5 = new Question(
  'Console.log(typeof[]) would return what?',
  ['Array','Object', 'String', 'NAN'],
  1
)

const quiz = new Quiz([q1, q2, q3, q4, q5]);

const listeners = _ => {
  nextButtonEl.addEventListener('click', function() {
    const selectedRadioEl = document.querySelector('input[name="choice"]:checked');
    if (selectedRadioEl) {
      const key = Number(selectedRadioEl.getAttribute('data-order'));
      quiz.guess(key);
      renderAll();
    } else {
      alert('Please make a choice.');
    }
  })
  restartButtonEl.addEventListener('click', function() {
    // 1. reset the quiz
    quiz.reset()
    // 2. renderAll
    renderAll()
    // 3. restore the next button
    nextButtonEl.style.opacity = 1;
    setValue(taglineEl, 'Pick an option below');
    choicesEl.style.opacity = 1;

  })
}

const setValue = (elem, value) => {
  elem.innerHTML=value;
}

const renderQuestion = _ => {
  const question = quiz.getCurrentQuestion().question;
  // quizQuestionEl.innerHTML = question;
  setValue(quizQuestionEl, question);
}

const renderChoices = _ => {
  let markup = '';
  const currentChoices = quiz.getCurrentQuestion().choices;
  currentChoices.forEach((elem, index) => {
    markup += `
    <li class="jabquiz__choice">
      <input type="radio" name="choice" class="jabquiz__input" data-order='${index}' id="choice${index}">
        <label for="choice${index}" class="jabquiz__label">
        <i></i>
        <span>${elem}</span>
        </label>
    </li>
    `
  });
  // choicesEl.innerHTML = markup;
  setValue(choicesEl, markup);
}

const renderTracker = _ => {
  const index = quiz.currentIndex;
  setValue(trackeEl, `${index+1} of ${quiz.questions.length}`)
}

const getPercentage = (num1, num2) => {
  return Math.round((num1/num2)*100);
}

const launch = (width, maxPercent) => {
  let loadingBar = setInterval(function() {
    if (width > maxPercent) {
      clearInterval(loadingBar);
    } else {
      width ++;
      progressInnerEL.style.width = `${width}%`;
    }
  }, 3)
}

const renderProgress = _ => {
  // 1. width
  const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length)
  // 2. launch (0, width)
  launch(0,`${currentWidth}`);
}
const renderEndScreen = _ => {
  setValue(quizQuestionEl, 'Great Job')
  setValue(taglineEl, 'Complete')
  setValue(trackeEl, `Your Score: ${getPercentage(quiz.score, quiz.questions.length)}%`)
  nextButtonEl.style.opacity = 0;
  renderProgress();
  choicesEl.style.opacity = 0;
}


const renderAll = _ => {
  if (quiz.hasEnded()) {
    // render end screen
    renderEndScreen();
  } else {
    // 1. render the question
    renderQuestion()
    // 2. render the choices
    renderChoices()
    // 3. render the tracker
    renderTracker()
    // 4. render the progress
    renderProgress()
  }
  }
  return {
    renderAll: renderAll,
    listeners: listeners
};
})();

app.renderAll();
app.listeners();