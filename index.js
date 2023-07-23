var gamePattern = [];

var userClickedPattern = [];

var btnColours = ["red", "blue", "green", "yellow"];

var randomChosenColour;

var firstTime = 0;

var click = 0;

var level = 0;

function showChosenColor(){
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour); 
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
    firstTime = 0;
    level = 0;
    click = 0;
}

function nextSequence(){
    randomChosenColour = btnColours[Math.floor(Math.random() * 4)];
    level++;
    $("h1").text("Level "+level);
    gamePattern.push(randomChosenColour);
    showChosenColor();
    userClickedPattern = [];
}

$(".btn").on("click", function(){
    if(firstTime === 0){
        nextSequence();
        firstTime = 1;
    } else {
        buttonClick(this.id);
    }
});

function buttonClick(button){
    makeSound(button);
    buttonAnimation(button);
    userClickedPattern.push(button);
    checkAnswer(click);
}

function makeSound(color){
    switch (color){
        case "red":
            var audio = new Audio("./sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("./sounds/yellow.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("./sounds/green.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("./sounds/blue.mp3");
            audio.play();
            break;
        default:
            var audio = new Audio("./sounds/wrong.mp3");
            audio.play();
    }
}

function buttonAnimation(color){
    $("#"+color).toggleClass("pressed");
    setTimeout(() => {
        $("#"+color).toggleClass("pressed");
    }, 100);
}

document.addEventListener("keypress", function(evt){
    if(firstTime === 0){
        nextSequence();
        firstTime = 1;
    } else {
        switch (evt.key){
            case "a":
                buttonClick("green");
                break;
            case "w":
                buttonClick("red");
                break;
            case "s":
                buttonClick("yellow");
                break;
            case "d":
                buttonClick("blue");
                break;
        }
    }
})
