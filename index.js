// select html elements

// import { isEnemy } from "./conditions";

var mainSection = document.querySelector(".main");
var gameContainer = document.querySelector(".game");
var gameSection = document.querySelector(".game-wrapper");
var tutorialSection = document.querySelector(".tutorial");
var choseUserPanel = document.querySelector(".chose-user-panel")

var childTutorial = tutorialSection.children;
var gameFinished = document.querySelector(".game-finished");
var formTitle = document.querySelector(".form-title");
var btnForm = document.querySelector("#button-form");
var btnReady = document.querySelector("#button-ready");
var btnBackMain = document.querySelector("#back-main");
var btnTryAgain = document.querySelector("#try-again");

var btnTutorial = document.querySelector("#button-tutorial");
var btnTutorialNext = document.querySelector("#tutorial-next");
var btnTutorialBack = document.querySelector("#tutorial-back");
var buttonsMode = document.querySelector(".buttons-mode");
var childBtnsMode = buttonsMode.children;
var carouselColor = document.querySelector(".carousel-color");
var arrSteps = ["username".split(""), "choose mode".split(""), "choose color".split(""), "Are you ready".split("")];
var colors = ["rgba(191, 85, 236, 0.8)", "rgba(0,128,0, 0.8)", "rgba(255, 0, 0, 0.8)"]
var inputName = document.querySelector(".input-name");
var box = document.getElementById("myId");
var livesStatus = document.querySelector(".lives");
var cuentaAtras = document.querySelector("#cuenta-atras");
var stepForm = -1; // to be set at -1

//timers, useful to have them in vars in order to stop them

var gameTimer; // date object to compute time spent playing
var timeObstacle;

// time intervals

var intHframes; // heart frames
var intCframes; // coin frames
var gameLoop; // game interval


// current game item  that appears on screen
var numObs = 0;

// array of objects that appear in the game
var arrObs = [];


//audio effects

var coinSound = document.getElementById('sound-coin');
var soundPup = document.getElementById('sound-powerup');
var soundClick = document.getElementById('sound-click');
var soundStart = document.getElementById('sound-start');
var numCoins = document.querySelector(".coin-number");

// vars related to the current match being played, vars set to "easy" mode by default

var currentUser;
var currentLife = 5;
var currentKey;
var currentMode = "EASY";
var currentColor = colors[0];

var defaultHoles = [2, 3, 1, 4, 1, 3, 2, 2, 3, 1, 4, 1]; // array used in the creation of "enemies"
var numBoxes = 6; // number of boxes that will be sent in column
var bMargin = 15; //  margin between those boxes
var bSize = 50; // box size

// object were all users wil be stored
var Users = {

}

//  create a div for every color in the array of colors, in order for the user to  select one of them

colors.forEach(color => {

    let li = document.createElement("li");
    let btnColor = document.createElement("button");
    btnColor.style.backgroundColor = color;
    btnColor.style.width = "60px";
    btnColor.style.height = "60px";
    btnColor.addEventListener("click", updateColor)
    li.appendChild(btnColor);
    carouselColor.appendChild(li);

})


/*------------------------------------------
functions for displaying the form titles letter by letter
-----------------------------------------------*/

function nextStepForm() {
    stepForm++;
    displayLetters(arrSteps[stepForm], formTitle);
    showStepCallbacks[stepForm]();
}

function displayLetters(charArray, element) {
    let counter = 0;
    let displayedString = "";
    let timer = setInterval(displayLetter, 200);

    function displayLetter() {
        displayedString += charArray[counter];
        element.textContent = displayedString;
        counter++;
        if (counter == charArray.length) {
            clearInterval(timer);
        }
    }
}

/*---------------------------------
create new user
----------------------------------*/

function createUser(newUser) {
    newUser = newUser.trim();
    let user = {
        username: newUser,
        mode: "EASY",
        color: colors[0],
        time: undefined,
        score: 0
    }
    Users[newUser] = user;
    currentUser = newUser;
}

/* event listener for the easy/ medium / hard options*/

for (let i = 0; i < childBtnsMode.length; i++) {
    childBtnsMode[i].addEventListener("click", updateMode);
}

/* -----------------------------
update the choices made by the user into the " current" variables and also
the user object

current variables: defined in the global scope in order to acces them as easy as possible
when looping in the "keyloop"
------------------------------*/
function updateMode(event) {

    modeSelected = document.querySelector(".mode-selected")
    modeSelected.classList.remove("mode-selected");
    event.target.classList.add("mode-selected");
    currentMode = event.target.textContent;

}

function updateColor(event) {
    currentColor = event.target.style.backgroundColor;
    Users[currentUser].color = currentColor;
}

function updateLife() {

    switch (currentMode) {
        case "EASY":
            currentLife = 5;
            break;
        case "MEDIUM":
            currentLife = 3;
            break;
        case "HARD":
            currentLife = 1;
            break;
    }

    for (i = 0; i < currentLife; i++) {

        var heart = document.createElement('li');
        heart.classList.add("heart");
        livesStatus.appendChild(heart);
    }
}

/*
some event listeners, for form validation and for going back to the main after
finishing one match
 */

btnForm.addEventListener("click", validateForm);
btnReady.addEventListener("click", validateForm);
btnBackMain.addEventListener("click", backToMain);
btnTryAgain.addEventListener("click", tryAgain);
btnTutorial.addEventListener("click", showTutorial);
btnTutorialNext.addEventListener("click", nextTutorialMessage);
btnTutorialBack.addEventListener("click", tutorialFinished);


function initializeForm(){

    clickButtonIfEnter(btnForm);
    stepForm = -1;
    nextStepForm();
}

var showStepCallbacks = [showStep0Form,showStep1Form,showStep2Form,showStep3Form];


/* ---------------------
validation function
---------------------*/

function validateForm() {
    switch (stepForm) {
        case 0: { // username
            let username = inputName.value;
            inputName.value = "";

            if (username != "") {
                createUser(username);
                nextStepForm();
                soundClick.play();
                soundClick.currentTime = 0;
            }
            break;
        }
        case 1: { //mode

            Users[currentUser].mode = currentMode;
            nextStepForm();
            updateLife();
            soundClick.play();
            soundClick.currentTime = 0;

            break;
        }
        case 2: { // choose color

            nextStepForm();
            box.style.backgroundColor = Users[currentUser].color;
            soundClick.play();
            soundClick.currentTime = 0;
            break;
        }

        case 3: { // start game
            soundStart.play();
            counterBack(cuentaAtras);
            mainSection.classList.add("hidden");
            btnTutorial.classList.add("hidden");
            includeObjects();
            addObject(1,200,"250px",'blue-box')
            break;
        }
    }
}
let cBack = ["3", "2", "1", "0", "GO!", ""]; // count down array for begining the game

function counterBack(element) {
    let counter = 0;
    let timer = setInterval(displayNum, 800);

    function displayNum() {
        let num = cBack[counter];
        element.textContent = num;
        counter++;
        if (counter == cBack.length) {
            element.textContent = "";
            clearInterval(timer);
        }
    }
}



function tryAgain(){


    Users[currentUser].time = 0;
    Users[currentUser].score = 0;


    updateLife();
    stepForm = 3;
    validateForm();
    hideRanking();
    btnBackMain.classList.add("hidden");

    
}

/*---------------------------------------------
functions for hiding / showing sections and elements
-----------------------------------------------------*/


function showStep0Form(){



    console.log('showing step 0 form')
    inputName.classList.remove("hidden");

    console.log('users',Object.keys(Users))
    if(Object.keys(Users).length) {
         choseUserPanel.classList.remove("hidden")
     }

}
function showStep1Form() {

    inputName.classList.add("hidden");
    buttonsMode.classList.remove("hidden");
}

function showStep2Form() {
    buttonsMode.classList.add("hidden");
    carouselColor.classList.remove("hidden");

}

function showStep3Form() {
    carouselColor.classList.add("hidden");
    btnForm.classList.add("hidden");
    btnReady.classList.remove("hidden");
}

function showRanking() {
    gameSection.classList.add("hidden");
    gameFinished.classList.remove("hidden");
    btnTryAgain.classList.remove('hidden');
}


function hideRanking() {
    gameFinished.classList.add("hidden");
    btnTryAgain.classList.add('hidden');
}

function showTutorial() {

    mainSection.classList.add("hidden");
    btnTutorial.classList.add("hidden");
    tutorialSection.classList.remove("hidden");
}

function tutorialFinished() {

    childTutorial[messageNum].classList.add("hidden");
    childTutorial[0].classList.remove("hidden");
    messageNum = 0;
    tutorialSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
    btnTutorial.classList.remove("hidden");
    btnTutorialNext.classList.remove("hidden");
    btnTutorialBack.classList.add("hidden");
}


var messageNum = 0;

function nextTutorialMessage() {

    messageNum++;
    childTutorial[messageNum - 1].classList.add("hidden");
    childTutorial[messageNum].classList.remove("hidden");
    if (messageNum == childTutorial.length - 3) {

        btnTutorialNext.classList.add("hidden");
        btnTutorialBack.classList.remove("hidden");

    }
}
/*
------------------------------------------------------------------
start game function called in the last step of the validation function
-------------------------------------------------------------------
 */
function startGame() {
    gameSection.classList.remove("hidden");
    document.onkeydown = detectKey;
    document.onkeyup = removeKey;
    initializeLoops();
    setTimeout(pushObstacle, arrObs[0][0]); /* timeout for starting to include elements in the game*/

}

function initializeLoops() {
    intHframes = setInterval(hFrames, 500);
    intCframes = setInterval(cFrames, 200);
    gameLoop = setInterval(keyLoop, gameInt); /* main loop game */
    gameTimer = new Date();
}

function finishLoops() {

    // finish loops and reset variables
    clearInterval(intHframes);
    clearInterval(intCframes);
    clearTimeout(timeObstacle);
    clearTimeout(powerUpTimer);
    clearTimeout(timeDamaged);

    arrObs = [];
    numObs = 0;
    power = false;
    damaged = false;
    // delete all objects in the game except for the main box
    var children = gameContainer.children;
    gameContainer.innerHTML = '';
    box.style.marginLeft = "750px";
    box.style.marginTop = "250px";
    gameContainer.appendChild(box);

    storeUserInfo();
    updateRanking();
    showRanking();
}

/* store  user time and score once the game has finished */

function storeUserInfo() {
    var time = new Date();
    Users[currentUser].score = Number(numCoins.textContent);
    numCoins.textContent = '0';
    Users[currentUser].time = minSec(time.getTime() - gameTimer.getTime());

}

/*----------------------------------------------------------------
update the ranking tables depending on which mode did the user chose
-------------------------------------------------------------------*/
function updateRanking() {
    switch (Users[currentUser].mode) {
        case "EASY": {

            var scoreTitle = document.querySelector(".easy-mode .score-title");
            var timeTitle = document.querySelector(".easy-mode .time-title");
            var userTitle = document.querySelector(".easy-mode .user-title");
            break;
        }

        case "MEDIUM": {

            var scoreTitle = document.querySelector(".medium-mode .score-title");
            var timeTitle = document.querySelector(".medium-mode .time-title");
            var userTitle = document.querySelector(".medium-mode .user-title");
            break;

        }

        case "HARD": {

            var scoreTitle = document.querySelector(".hard-mode .score-title");
            var timeTitle = document.querySelector(".hard-mode .time-title");
            var userTitle = document.querySelector(".hard-mode .user-title");
            break;

        }

    }

    var userName = document.createElement("li");
    userName.textContent = Users[currentUser].username;
    var finalScore = document.createElement("li");
    finalScore.textContent = Users[currentUser].score;
    var finalTime = document.createElement("li");
    finalTime.textContent = Users[currentUser].time;

    userTitle.insertAdjacentElement('afterend', userName);
    scoreTitle.insertAdjacentElement('afterend', finalScore);
    timeTitle.insertAdjacentElement('afterend', finalTime);

    btnBackMain.classList.remove("hidden");
}




/* back to main once the gaim has finished */

function backToMain() {


    // location.reload();
    inputName.classList.remove("hidden");
    gameFinished.classList.add("hidden");
    btnBackMain.classList.add("hidden");
    mainSection.classList.remove("hidden");
    btnTutorial.classList.remove("hidden");
    btnTryAgain.classList.add('hidden');

    initializeForm();

    

   
}

/*-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
Only function  directly called, in order to display the 'username' title
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - */
// nextStepForm();
// showStep0Form(btnForm);

initializeForm();



/*-----------------------------------------------------------
reseting the currentkey var if the user stops pressing it, in order to then handle
the game variables using the currentKey instead of the event.target. That is because the default keyboard listener carries
a inherent delay we want to avoid .
--------------------------------------------*/

function removeKey(e) {
    if (e.keyCode == currentKey) {
        currentKey = undefined;
    }
}

// game constraints
var gWidth = 1500;
var gHeight = 500;
var boxSize = pixToInt(box.style.width);
var marginGame = 5;
var limitBottom = gHeight - boxSize - marginGame;
var limitRight = gWidth - boxSize - marginGame;
var bH2 = boxSize / 2
var vBox = 7;
var vOthers = 5;
var gameInt = 16; // gameInterval
box.style.marginLeft = "750px";
box.style.marginTop = "250px";


var timeDamaged;
var powerUpTimer;

/*-----------------------------
 Main loop game. Div elements moved by using margins and position absolutes
 ------------------------*/

 // object types : 

     //coin
     //same box
     //blue box
     //diamond
     //heart
     //blue-moving-box


function keyLoop() {
    let posLeft = box.offsetLeft;
    let posTop = box.offsetTop;
    let childGame = gameContainer.children;
    if (currentKey == '87' && borderTop(box)) {
        box.style.marginTop = (posTop - vBox) + "px";
    } else if (currentKey == '83' && borderBottom(box)) {
        box.style.marginTop = (posTop + vBox) + "px";
    } else if (currentKey == '65' && borderLeft(box)) {
        box.style.marginLeft = (posLeft - vBox) + "px";
    } else if (currentKey == '68' && borderRight(box)) {
        box.style.marginLeft = (posLeft + vBox) + "px";
    }

    for (let i = 1; i < childGame.length; i++) {
        if (collision(box, childGame[i])) {
            if (isEnemy(childGame[i]) && !power && !damaged) {

                currentLife--;
                damaged = true;
                timeDamaged = setTimeout(damagedFinished, 1500);
                document.querySelectorAll(".heart")[0].remove();

                if (currentLife <= 0) {
                    clearInterval(gameLoop);
                    finishLoops();

                }

            } else if (childGame[i].classList.contains("coin")) {
                numCoins.textContent = (Number(numCoins.textContent) + 1).toString();
                coinSound.play();
                coinSound.currentTime = 0
            } else if (childGame[i].classList.contains("diamond")) {
                numCoins.textContent = (Number(numCoins.textContent) + 5).toString();
                coinSound.play();
                coinSound.currentTime = 0;
            } else if (childGame[i].classList.contains("same-box")) {

                box.classList.add("power-up");
                power = true;
                soundPup.play();
                soundPup.currentTime = 0;
                clearTimeout(powerUpTimer);
                powerUpTimer = setTimeout(pUpFinished, 6000);
            }
            childGame[i].remove();
        } else if (!borderLeft(childGame[i])) {
            childGame[i].remove();
        } else {
            childGame[i].style.marginLeft = (childGame[i].offsetLeft - vOthers) + "px";


            if(childGame[i].classList.contains('fast-blue-box')){

                childGame[i].style.marginLeft = (childGame[i].offsetLeft - vOthers*2) + "px";

                // if (currentKey == '87' && borderTop(box)) {
                //     childGame[i].style.marginTop = (posTop - vBox/2) + "px";
                // } else if (currentKey == '83' && borderBottom(box)) {
                //     childGame[i].style.marginTop = (posTop + vBox/2) + "px";
                // } else if (currentKey == '65' && borderLeft(box)) {
                //     childGame[i].style.marginLeft = (posLeft - vBox/2) + "px";
                // } else if (currentKey == '68' && borderRight(box)) {
                //     childGame[i].style.marginLeft = (posLeft + vBox/2) + "px";
                // }

            }
        }
    }
}


/*------------------------------------------------------------
Functions for checking collisions and defining the screen borders
-------------------------------------------------------------*/

function collision(element1, element2) {
    let p1 = position(element1);
    let p2 = position(element2);
    return (Math.abs(p1[0] - p2[0]) < (p1[2] + p2[2]) && Math.abs(p1[1] - p2[1]) < (p1[2] + p2[2]))
}

function borderTop(element) {
    return pixToInt(element.style.marginTop) > marginGame;
}

function borderBottom(element) {
    return pixToInt(element.style.marginTop) < limitBottom;
}

function borderLeft(element) {
    return pixToInt(element.style.marginLeft) > marginGame;
}

function borderRight(element) {
    return pixToInt(element.style.marginLeft) < limitRight;
}

/*------------------------------------------------------------
functions for defining object "waves"
-------------------------------------------------------------*/
function includeObjects() {


    berniWave();
    //   addObject(1,600,"250px",'blue-moving-box')
    //  firstWave();
    //  secondWave();
    //  thirdWave();
    //  tunnel(10, 5);
    //  snakeWall(5, 100);
}



/*----------------------------------------------------------------------------
creating the actual hmtl element from the array arrObs and adding it to the game-container, sequencially and one by one.
---------------------------------------------------------------------------*/

numObs = 0

function pushObstacle() {

    let newObs = document.createElement('div');
    if (arrObs[numObs][2] == "same-box") {
        newObs.style.backgroundColor = currentColor;
    }
    newObs.classList.add(arrObs[numObs][2]);
    newObs.style.marginLeft = "1480px";
    newObs.id = "obstacle" + numObs;
    newObs.style.marginTop = arrObs[numObs][1];
    gameContainer.appendChild(newObs);
    numObs++;

    if (numObs >= arrObs.length) {
        numObs = 0;
        arrObs = shuffle(arrObs);
    }
    timeObstacle = setTimeout(pushObstacle, arrObs[numObs][0]);

}


/*---------------------------------
other functions used in the game loop
-------------------------*/


var power = false;
var damaged = false;

//function called by a timeout in the game loop when the user gets a power up

function pUpFinished() {

    box.classList.remove("power-up");
    power = false;
}

// function called by a timeout in the gameloop when user gets damaged
function damagedFinished() {
    damaged = false;
}


// frames for the sprites (coins, hearts, diamonds)

var hFrame = 0;
var cFrame = 0;
var dFrame = 0;


// hearts
function hFrames() {
    var heartImg = document.querySelectorAll(".heart");
    heartImg.forEach(h => {
        h.style.backgroundImage = `url('assets/images/heart${hFrame}.png')`
    })
    hFrame = (hFrame + 1) % 4;
}

//coins
function cFrames() {
    let coinImg = document.querySelectorAll(".coin");
    coinImg.forEach(c => {
        c.style.backgroundImage = `url('assets/images/coin_${cFrame}.png')`;
    })

    cFrame = (cFrame + 1) % 8;
    dFrames(); // both executed simulaneously , so we don't call an extra timer;

}

// diamonds
function dFrames() {
    let diamondImg = document.querySelectorAll(".diamond");
    diamondImg.forEach(d => {
        d.style.backgroundImage = `url('assets/images/diamond${dFrame}.png')`;
    })
    dFrame = (dFrame + 1) % 4
}



//-----------------------------------


//conditions



// function isEnemy(element){
//     return element.classList.contains("blue-box") || element.classList.contains("blue-moving-box")
    
//     }



//TODO 

 // rethink waves (easy medium hard)

 // sound when you get hit

 // small animation when you get hit 

 // easy, medium , hard waves

 //deploy to netlify

 // isolate logic


 // hearts -> restart params on game restarted . 