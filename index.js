var gamePattern = [];
var userClickedPattern = [];
var btnColours = ["red", "blue", "green", "yellow"];

var firstTime = true;
var click = 0;
var level = 0;

function showChosenColor(colour){
    $("#"+colour).fadeOut(100).fadeIn(100);
    makeSound(colour); 
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        click++;
        if(click == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },300);
            click = 0;
        }
    } else {
        gameOver();
    }
}

function gameOver(){
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Fim de jogo, aperte qualquer tecla para reiniciar");
    makeSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(() => {
        $("body").toggleClass("game-over");
    }, 200);
    firstTime = true;
    level = 0;
    click = 0;
}

function nextSequence(){
    var randomChosenColour = btnColours[Math.floor(Math.random() * 4)];
    level++;
    $("h1").text("Level "+level);
    gamePattern.push(randomChosenColour);
    showChosenColor(randomChosenColour);
    userClickedPattern = [];
}

$(".btn").on("click", function(){
    buttonClick(this.id);
});

function buttonClick(button){
    makeSound(button);
    buttonAnimation(button);
    userClickedPattern.push(button);
    checkAnswer(click);
}

function makeSound(color){
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function buttonAnimation(color){
    $("#"+color).toggleClass("pressed");
    setTimeout(() => {
        $("#"+color).toggleClass("pressed");
    }, 100);
}

document.addEventListener("keypress", function(evt){
    if(firstTime === true){
        nextSequence();
        firstTime = false;
    } else {
        buttonClick(document.querySelector("." + evt.key).id);
    }
})
