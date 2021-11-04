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

const startQuiz = () => {
    // add attributes to hide start screen
    var startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");

    // remove attribute to show questions 
    questionsElement.removeAttribute("class");

    // begin timer for 10 seconds
    timerID = setInterval(clockTick, 1000); 

    // show starting time
    timerElement.textContent = time;

    getQuestion();
}

const endQuiz = () => {
    // end timer 
    clearInterval(timerID);

    // remove attribute to show end screen 
    var endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    // remove attribute to show final score 
    var finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    // add attributes to hide questions section 
    questionsElement.setAttribute("class", "hide");
}

const clockTick = () => {
    // update time 
    time--;
    timerElement.textContent = time;

    // end quiz if user runs out of time 
    if (time <= 0) {
        endQuiz();
    }
}

