var color = ["yellow", "green", "red", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var volume = 1;
var score = 0;
var highestScore = localStorage.getItem("highScore");
var started = false;
var popUpOn = false;

if(highestScore === null) {
    highestScore = 0;
}

if(started === false && popUpOn === false) {
    $(document).keydown((e) => {
        if(!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    })
}

function nextSequence() {
    userClickedPattern = [];
    var randomChosenColor = color[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function playAudio(input){
    var audio = new Audio("sounds/" + input + ".mp3");
    audio.volume = volume;
    audio.play();
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playAudio(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    animatePress(userChosenColour);
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                score++;
                nextSequence();
            }, 1000)
        }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.volume = volume;
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },200)
        if(started === true) {
            $("#level-title").text("Game Over, Press A To Restart")
        }
        checkHighScore(score);
        popUp();
    }
}

function animatePress(color) {
    $("." + color).addClass("pressed");
    setTimeout(() => {
        $("." + color).removeClass("pressed");
    },100)
}

function restartGame() {
    if(popUpOn === false) {
        gamePattern = [];
        level = 0;
        score = 0;
        started = false;
    }
}

function checkHighScore(curerntScore) {
    if(curerntScore > localStorage.getItem("highScore")){
        var highScore = curerntScore;
        localStorage.setItem("highScore", curerntScore)
        highestScore = highScore;
        console.log(highScore);
    }
}

// Volume

$(".iconsmall").click(() => {
    volume = 0.2;
    changeVolume(1);
})

$(".iconbig").click(() => {
    volume = 1;
    changeVolume(5);
})

$(".vol1").click(() => {
    volume = 0.2;
    changeVolume(1);
})

$(".vol2").click(() => {
    volume = 0.4;
    changeVolume(2);
})

$(".vol3").click(() => {
    volume = 0.6;
    changeVolume(3);
})

$(".vol4").click(() => {
    volume = 0.8;
    changeVolume(4)
})

$(".vol5").click(() => {
    volume = 1;
    changeVolume(5);
})

function changeVolume(level) {
    if($(".vol" + level).hasClass("unactive")) {
        for(i = 1; i <= level; i++) {
            $(".vol" + i).removeClass("unactive");
        }
    }
    for(i = level + 1; i <=5; i++) {
        $(".vol" + i).addClass("unactive");
    }
}

// Pop-Up

function popUp() {
    if(started === true) {
        $("#container").addClass("active").fadeOut(1).fadeIn(250);
        $("#overlay").addClass("active");
        popUpOn = true;
    }
    $(".highScore").text("Your Highest Score: " + highestScore);
    $(".currentScore").text("Your Current Score: " + score);
}

$(".close-btn").click((e) => {
    $("#container").fadeOut(250);
    $("#overlay").removeClass("active");
    popUpOn = false;
    restartGame();
})
