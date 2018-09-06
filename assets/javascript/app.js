// array of questions
let questions = ["陸棲哺乳類では最大の大きさを誇る", "性情温和，比较容易驯服", "فیل‌ها سنگین‌ترین جانوران خشکی هستند.", "ஆண் யானைக்கு களிறு என்று பெயர்.", "الفيل حيوان ثدييي نباتي", "코끼리의 코는 가장 활용을 많이하는 수단이다.", ".החדק משמש אפו של הפיל", "Слон очень хорошо плавает.", "Сонсгол мөн сайн боловч хараа муутай.", "Ndovu wa Kiafrika ni mkubwa."];
// The correct answers
let answers = ["Japanese", "Chinese", "Persian", "Tamil", "Arabic", "Korean", "Hebrew", "Russian", "Mongolian", "Kiswahili"];
// The options displayed to the user
let options = [
    ["Japanese", "Chinese", "Thai", "Korean"],
    ["Thai", "Japanese", "Chinese", "Vietnamese"],
    ["Arabic", "Persian", "Kurdish", "Turkish"],
    ["Tamil", "Telugu", "Kannada", "Malayalm"],
    ["Persian", "Urdu", "Pashto", "Arabic"],
    ["Japanese", "Chinese", "Korean", "Vietnamese"],
    ["Maltese", "Ugaritic", "Hebrew", "Arabic"],
    ["Ukrainian", "Russian", "Serbian", "Croatian"],
    ["Arabic", "Mongolian", "Persian", "Kurdish"],
    ["Ilwana", "Pokomo", "Comorian", "Kiswahili"]
];
// turn counter
let i = 0;
let answersCorrect = 0;
// reference to the setTimeout for the question time
let intervalId;
// prevent speeding up
let timerRunning = false;
// reference to the setTimeout for the waiting time
let waitId;

// Event listener for the answers
$("body").on("click", ".answer", function (event) {
    clearInterval(intervalId);
    timerRunning = false;
    userAnswer = $(this).text();
    if (userAnswer === answers[i]) {
        win();
    }
    else {
        loss();
    }
});

// Timer object
var timer = {

    // Time starts at 10 seconds per question
    time: 10,

    reset: function () {
        // Reset the timer to 10 seconds
        timer.time = 10;
        if (!timerRunning) {
            intervalId = setInterval(timer.count, 1000);
            timerRunning = true;
        }
        $(".timeremaining").html("<h4> Time remaining: " + timer.time + " seconds </h4>");
    },

    count: function () {
        // Decrement time
        timer.time--;
        // Check if 0 
        if (timer.time === 0) {
            clearInterval(intervalId);
            timerRunning = false;
            timeOver();
        } else {
            // Display time left
            $(".timeremaining").html("<h4> Time remaining: " + timer.time + " seconds </h4>");
        }
    },
};

// Event listener for restart button
$(".restartbutton").on('click', '.resetbtn', function () {
    startGame();
});

// Wait 3 seconds between each question
function wait () {
    if (i < 10) {
        i++;
        waitId = setInterval(displayGameText, 3000);
    }
};

// Resets whole game
function startGame() {
    $(".restartbutton").empty();
    i = 0;
    answersCorrect = 0;
    displayGameText();
};

// Present a click to play button to the user
function firstScreen() {
    $(".timeremaining").empty();
    $(".question").html("<h2> Welcome! </h2>");
    $(".answer").empty()
    $(".restartbutton").html('<button type="button" class="resetbtn rounded btn-lg" >Click to Play</button>');
};

// For every round:
function displayGameText() {
    clearInterval(waitId);
    // end game if we've gone through all questions
    if (i === 10) {
        endGame();
    } else {
        // Start the timer
        timer.reset();
        // Display question
        $(".question").html("<h2>" + questions[i] + "</h2>");
        // Display answers
        $(".answer1").html("<h4>" + options[i][0] + "</h4>");
        $(".answer2").html("<h4>" + options[i][1] + "</h4>");
        $(".answer3").html("<h4>" + options[i][2] + "</h4>");
        $(".answer4").html("<h4>" + options[i][3] + "</h4>");
    }
};

// If user is correct, display "correct", increment answersCorrect, wait 3 seconds, go to next question
function win() {
    answersCorrect++;
    $(".timeremaining").empty();
    $(".question").html("<h2> Correct answer! </h2>");
    $(".answer").empty();
    wait();
};

// If user is incorrect, display "incorrect", wait 3 seconds, go to next question
function loss() {
    $(".timeremaining").empty();
    $(".question").html("<h2> Incorrect answer! </h2>");
    $(".answer").empty();
    wait();
};

// If 10 seconds passed and user entered nothing, end that turn
function timeOver() {
    $(".timeremaining").empty();
    $(".question").html("<h2> Out of time! </h2>");
    $(".answer").empty();
    wait();
};

// Tell user their final stats and allow them to play again
function endGame() {
    clearInterval(intervalId);
    timerRunning = false;
    $(".timeremaining").empty();
    $(".question").html("<h2> Game over! </h2>");
    $(".answer").empty();
    $(".answer1").text("Answers Correct: " + answersCorrect);
    $(".answer2").text("Percentage Correct: " + answersCorrect * 10 + "%");
    $(".restartbutton").html('<button type="button" class="resetbtn rounded btn-lg" >Play Again</button>');
}

// Start the game 
firstScreen();
