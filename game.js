var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
function nextSequence(level){
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
}


$("body").keypress(function(){
    if(isGameStarted===false){
        nextSequence(level);
        isGameStarted = true;
    }
})

$(".btn").click(function(){
    if(isGameStarted){    
        userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        if(checkAnswer(level)===true){
            playSound(userChosenColor);
            level = level+1;
            nextSequence(level);
        }
        else{
            isGameStarted = false;
        }
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]!==userClickedPattern[currentLevel]){
        playSound("wrong");
        $("body").css("background-color","red");
        setTimeout(function(){
            $("body").css("background-color","#011F3F");
        },300)
        $("h1").text("Game Over, your score is "+currentLevel+", Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        return false;
    }
    return true;
}


function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(buttonId){
    $("#"+buttonId).addClass("pressed");
    setTimeout(()=>{
        $("#"+buttonId).removeClass("pressed");
    },100)
}