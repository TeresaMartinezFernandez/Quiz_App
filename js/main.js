"use strict";

//select all elements

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImage");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const barTime = document.getElementById("barRestTime");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");

//create our questions

let questions = [
  {
    question: "¿Cuál es la temperatura de ebullición del agua?",
    imgSrc: "images/question1.jpg",
    choiceA: "100 grados centígrados",
    choiceB: "110 grados centígrados",
    choiceC: "200 grados centígrados",
    correct: "A",
  },
  {
    question: "¿Cuál es la temperatura de congelación del agua?",
    imgSrc: "images/question2.png",
    choiceA: "3 grados centígrados",
    choiceB: "0 grados centígrados",
    choiceC: "10 grados centígrados",
    correct: "B",
  },
  {
    question: "¿Cuál es un fenómeno meteorológico?",
    imgSrc: "images/question3.png",
    choiceA: "erosión",
    choiceB: "oleaje",
    choiceC: "lluvia",
    correct: "C",
  },
];

//create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10 segundos
const barWidth = 150; // 150px
const barUnit = barWidth / questionTime;
let timer;
let score = 0;

//render a question

function renderQuestion() {
  let q = questions[runningQuestion];
  question.innerHTML = `<p> ${q.question}</p>`;
  qImg.innerHTML = `<img src= ${q.imgSrc}>`;
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click", startQuiz);

//start quiz

function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  timer = setInterval(renderCounter, 1000); // 1000ms = 1s
}

//render progress

function renderProgress() {
  for (let i = 0; i <= lastQuestion; i++) {
    progress.innerHTML += `<div class="prog" id=${i} ></div>`;
  }
}

//counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    barTime.style.width = count * barUnit + "px";
    count++;
  } else {
    count = 0;
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      //end the quiz and show the score
      clearInterval(timer);
      scoreRender();
    }
  }
}

//checkAnswer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++; // answer is correct
    // change color
    answerIsCorrect();
  } else {
    //answer is wrong and change color
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(timer);
    scoreRender();
  }
}

// answer is correct

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is wrong

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render

function scoreRender() {
  scoreContainer.style.display = "block";

  //calculate the amount of question percent answered by the user

  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the images based on the score

  let img =
    scorePerCent >= 80
      ? `images/5.png`
      : scorePerCent >= 60
      ? `images/4.png`
      : scorePerCent >= 40
      ? `images/3.png`
      : scorePerCent >= 20
      ? `images/2.png`
      : "images/1.png";

  scoreContainer.innerHTML = `<img src=${img}>`;
  scoreContainer.innerHTML += `<p> ${scorePerCent} % </p>`;
}
