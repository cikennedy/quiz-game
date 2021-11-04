// quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerID;

// reference DOM elements
var timerElement = document.getElementById("time");
var startElement = document.getElementById("start");
var questionsElement = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var submitElement = document.getElementById("submit");
var nameElement = document.getElementById("enter-name");
var feedbackElement = document.getElementById("feedback");
