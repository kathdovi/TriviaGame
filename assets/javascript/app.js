let questions = ["陸棲哺乳類では最大の大きさを誇る", "性情温和，比较容易驯服", "فیل‌ها سنگین‌ترین جانوران خشکی هستند.", "ஆண் யானைக்கு களிறு என்று பெயர்.", "الفيل حيوان ثدييي نباتي", "코끼리의 코는 가장 활용을 많이하는 수단이다.", ".החדק משמש אפו של הפיל", "Слон очень хорошо плавает.", "Сонсгол мөн сайн боловч хараа муутай.", "Ndovu wa Kiafrika ni mkubwa."];
let answers = ["Japanese", "Chinese", "Persian", "Tamil", "Arabic", "Korean", "Hebrew", "Russian", "Mongolian", "Kiswahili"];
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
let i = 0;
let answersCorrect = 0;
let intervalId;
let timerRunning = false;
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

startGame();

// For every round:
function displayGameText() {
    clearInterval(waitId);
    if (i === 10) {
        endGame();
    } else {
        timer.reset();
        $(".question").html("<h2>" + questions[i] + "</h2>");
        // Display answers
        $(".answer1").html("<h4>" + options[i][0] + "</h4>");
        $(".answer2").html("<h4>" + options[i][1] + "</h4>");
        $(".answer3").html("<h4>" + options[i][2] + "</h4>");
        $(".answer4").html("<h4>" + options[i][3] + "</h4>");
    }
};
// Reset timer

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

function timeOver() {
    $(".timeremaining").empty();
    $(".question").html("<h2> Out of time! </h2>");
    $(".answer").empty();
    wait();
};

function endGame() {
    clearInterval(intervalId);
    timerRunning = false;
    $(".timeremaining").empty();
    $(".question").html("<h2> Game over! </h2>");
    $(".answer").empty();
    $(".answer1").text("Answers Correct: " + answersCorrect);
    $(".answer2").text("Percentage Correct: " + answersCorrect + "0%");
    $(".restartbutton").html('<button type="button" class="resetbtn rounded btn-lg" >Play Again</button>');
}
