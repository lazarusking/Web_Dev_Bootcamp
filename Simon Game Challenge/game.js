
//getting randomColours selection
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var gameStart = false;
var level = 0;

$(document).on("keypress", function () {

    if (!gameStart) {
        nextSequence();
        $("#level-title").text("Level " + level);
        gameStart = true;
    }
});

//play sound on click
$(".btn").on("click", function () {
    //console.log(event.currentTarget);
    // console.log(this.id);
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)//or use level      


    // console.log(userClickedPattern + " click pattern");
    // console.log(gamePattern + " game pattern");
});
function checkAnswer(currentLevel) {// if using level replace "<=", "<" 
    for (var i = 0; i <= currentLevel; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            // return true
            console.log("true");
            console.log(userClickedPattern.length);
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    userClickedPattern = [];
                    nextSequence();
                }, 1000);
                break;
            }
        } else {
            console.log("false");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }
}

function startOver() {

    gamePattern = [];
    level = 0;
    gameStart = false;
}


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    // flashing random colours and playing sound
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // console.log(randomChosenColour)
    level++;
    $("#level-title").text("Level " + level);
    // $("#" + randomChosenColour).audio(soundDir);

}

function playSound(name) {
    var soundDir = "sounds/" + name + ".mp3";
    var sound = new Audio(soundDir);
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}



// console.log(level);
// checkAnswer(level);
//checking gamePattern and userClickedPattern
// var equalPattern = true;
// while (True) {
//     for (var i = 0; i < level; i++) {
//         if (gamePattern[i] === userClickedPattern[i]) {
//         }
//         else {
//             gamePattern = false;
//             gameOver();
//             break;
//         }
//     }

// }