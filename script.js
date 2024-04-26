const questions = [
  {
    question: "What does CSS specificity refer to?",
    answers: [
      {
        text: "The order in which styles are declared in the stylesheet",
        correct: false,
      },
      {
        text: "The importance of a style rule based on its selector specificity",
        correct: true,
      },
      {
        text: "The number of properties defined in a CSS rule",
        correct: false,
      },
      {
        text: "The compatibility of CSS styles across different browsers",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the following is NOT a valid way to include JavaScript in an HTML document?",
    answers: [
      {
        text: " Using the script tag with the src attribute",
        correct: false,
      },
      {
        text: 'Using the <link> tag with a rel attribute of "stylesheet"',
        correct: true,
      },
      {
        text: " Using the script tag with inline JavaScript code",
        correct: false,
      },
      {
        text: "Using an external JavaScript file linked with the href attribute",
        correct: false,
      },
    ],
  },
  {
    question: 'What does the "box-sizing" CSS property control?',
    answers: [
      {
        text: "The alignment of text within a box",
        correct: false,
      },
      {
        text: "The size of the margin around an element",
        correct: false,
      },
      {
        text: "How the total width and height of an element is calculated",
        correct: true,
      },
      {
        text: "The visibility of an element on the web page",
        correct: false,
      },
    ],
  },
  {
    question:
      "What is a benefit of using a CSS preprocessor like Sass or Less?",
    answers: [
      {
        text: " Improved browser compatibility for CSS styles",
        correct: false,
      },
      {
        text: "Faster rendering of CSS styles on the web page",
        correct: false,
      },
      {
        text: "The ability to use variables and mixins in CSS code",
        correct: true,
      },
      {
        text: "Automatic optimization of images used in CSS backgrounds",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answers");
const nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next Question";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Retake The Quiz";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
