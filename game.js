var color = ["yellow", "green", "red", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

if(started === false) {
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
                nextSequence();
            }, 1000)
        }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },200)
        if(started === true) {
            $("#level-title").text("Game Over, Press A To Restart")
        }
        restartGame();
    }
}

function animatePress(color) {
    $("." + color).addClass("pressed");
    setTimeout(() => {
        $("." + color).removeClass("pressed");
    },100)
}

function restartGame() {
    gamePattern = [];
    level = 0;
    started = false;
}
