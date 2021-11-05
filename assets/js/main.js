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

const getQuestion = () => {
    // get current question from question array 
    var currentQuestion = questions[currentQuestionIndex];

    // update question title with current question 
    var questionTitleElement = document.getElementById("question-title");
    questionTitleElement.textContent = currentQuestion.title;

    // clear the question choices text content 
    choicesElement.innerHTML = "";

    // loop over choices 
    currentQuestion.choices.forEach(function(choice, i) {
        // new button per choice 
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice; 

        // event listener on click for each choice 
        choiceNode.onclick = questionClick;

        // display on page
        choicesElement.appendChild(choiceNode);
    });
}

const questionClick = () => {
    // check if user correctly chose the answer or not 
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize if wrong 
        time -= 15;

        // bring time to 0 if penalized less than 0
        if (time < 0) {
            time = 0;
        }

        // display the updated time on the page 
        timerElement.textContent = time;

        feedbackElement.textContent = "Wrong answer.";
    } else {
        feedbackElement.textContent = "Correct answer.";
    }

    // show feedback for a brief period of time 
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);

    // move to the next question
    currentQuestionIndex++;

    // check to see if any questions remain in array
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}

const saveScore = () => {
    // get value of name input box 
    var userName = nameElement.value.trim();

    // validation that input was not empty 
    if (userName !== "") {
        // get scores from localStorage or set to empty array if none
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            name: userName
        };

        // save to localStorage 
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to scores page 
        window.location.href = "scores.html";
    }
}

const checkForEnter = (event) => {
    if (event.key === "Enter") {
        saveScore();
    }
}


// onclick button to start quiz 
startElement.onclick = startQuiz;

// onclick button to submit name 
submitElement.onclick = saveScore;

// onkeyup to check for enter 
nameElement.onkeyup = checkForEnter;
