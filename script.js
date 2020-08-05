// select html elements
var mainSection = document.querySelector(".main");
var gameContainer = document.querySelector(".game");
var gameSection = document.querySelector(".game-wrapper");
var tutorialSection = document.querySelector(".tutorial");

var childTutorial = tutorialSection.children;
var gameFinished = document.querySelector(".game-finished");
var formTitle = document.querySelector(".form-title");
var btnForm = document.querySelector("#button-form");
var btnReady = document.querySelector("#button-ready");
var btnBackMain = document.querySelector("#back-main");
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
    displayLetters(arrSteps[stepForm + 1], formTitle);
    stepForm++;
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
btnTutorial.addEventListener("click", showTutorial);
btnTutorialNext.addEventListener("click", nextTutorialMessage);
btnTutorialBack.addEventListener("click", tutorialFinished);


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
                showStep1Form();
                nextStepForm();
                soundClick.play();
                soundClick.currentTime = 0;
            }
            break;
        }
        case 1: { //mode

            Users[currentUser].mode = currentMode;
            showStep2Form();
            nextStepForm();
            updateLife();
            soundClick.play();
            soundClick.currentTime = 0;

            break;
        }
        case 2: { // choose color

            nextStepForm();
            showStep3Form();
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

/*---------------------------------------------
functions for hiding / showing sections and elements
-----------------------------------------------------*/

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

    console.log(gameContainer.children.length);
    console.log(gameContainer.children);
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
        }

        case "MEDIUM": {

            var scoreTitle = document.querySelector(".medium-mode .score-title");
            var timeTitle = document.querySelector(".medium-mode .time-title");
            var userTitle = document.querySelector(".medium-mode .user-title");

        }

        case "HARD": {

            var scoreTitle = document.querySelector(".hard-mode .score-title");
            var timeTitle = document.querySelector(".hard-mode .time-title");
            var userTitle = document.querySelector(".hard-mode .user-title");

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

    inputName.classList.remove("hidden");
    gameFinished.classList.add("hidden");
    btnBackMain.classList.add("hidden");
    mainSection.classList.remove("hidden");
    btnTutorial.classList.remove("hidden");
    stepForm = -1;
    nextStepForm();
}

/*-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
Only function  directly called, in order to display the 'username' title
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - */
nextStepForm();


/* detection of W/A/S/D keys */

function detectKey(e) {
    if (e.keyCode == '87' || e.keyCode == '83' || e.keyCode == '65' || e.keyCode == '68') {
        currentKey = e.keyCode;
    }
}

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
var vBox = 4;
var vOthers = 3;
var gameInt = 10; // gameInterval
box.style.marginLeft = "750px";
box.style.marginTop = "250px";


var timeDamaged;
var powerUpTimer;

/*-----------------------------
 Main loop game. Div elements moved by using margins and position absolutes
 ------------------------*/

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
            if (childGame[i].classList.contains("blue-box") && !power && !damaged) {

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
                powerUpTimer = setTimeout(pUpFinished, 6000);
            }
            childGame[i].remove();
        } else if (!borderLeft(childGame[i])) {
            childGame[i].remove();
        } else {
            childGame[i].style.marginLeft = (childGame[i].offsetLeft - vOthers) + "px";
        }
    }
}


/*------------------------------------------------------------
Functions for checking collisions and defining the screen borders
-------------------------------------------------------------*/

function collision(element1, element2) {
    let p1 = position(element1);
    let p2 = position(element2);
    return (Math.abs(p1[0] - p2[0]) <= (p1[2] + p2[2]) && Math.abs(p1[1] - p2[1]) <= (p1[2] + p2[2]))
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

    firstWave();
    secondWave();
    thirdWave();

}

function firstWave() {

    addObject(10, 300, "250px"); // if object not specified, it is a coin
    obstacleWall(hole = false);
    wait(3000);
    addObject(1, 600, "250px", "blue-box")
    obstacleWall(true, 2);
    obstacleWall(false, 2);
    wait(2000);
    obstacleWall(true, 2, timeInt = 100, send = "reversed");
    wait(2000);
    obstacleWall(true, 3, timeInt = 100);
    snakeWall(10, 150, arrayHoles = [2, 3, 1, 5, 3, 2, 2, 3, 4, 1]);
    addObject(1, 300, "250px", "diamond");
    randObject(4, 300, "blue-box");
    randObject(100, 50);
    randObject(1, 20, "same-box");
    randObject(40, 200, "blue-box");
    wait(2000);
    mixedWall("blue-box", "same-box", tInt = 50);
    snakeWall(5, 100);

    wait(1000);
    addObject(1, 50, "250px", "diamond");
    addObject(1, 250, "250px", "blue-box");
    coinLadder();

}

function secondWave() {
    snakeWall();
    obstacleWall(true, timeInt = 100);
    wait(1000);
    addObject(1, 300, "250px", "same-box");
    randObject(50, 170, "blue-box");
    wait(500);
    tunnel(10, 3);
    wait(500);
    tunnel(10, 5);
    coinLadder();
}

function thirdWave() {

    snakeWall(15, arrayHoles = [0, 5, 1, 5, 1, 4, 1, 4, 1, 5, 0, 5, 1, 4, 2])
    coinLadder();

}


/*----------------------------------------------------------------------------
creating the actual hmtl element from the array arrObs and adding it to the game-container, sequencially and one by one.
---------------------------------------------------------------------------*/

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


/*-------------------------------------
functions for making easier the addition of obstacles and power ups
------------------------------------------*/

// add a given number of objects
function addObject(num, interval, position = "250px", type = "coin") {
    for (let i = 0; i < num; i++) {
        arrObs.push([interval, position, type])
    }
}

// make a "wall" of objects, with a time interval and where will the hole be

function obstacleWall(hole = true, holeNum, timeInt = 50, send = "normal") {

    if (holeNum == undefined) {
        holeNum = Math.floor(numBoxes / 2)
    }
    for (let i = 0; i <= numBoxes; i++) {
        if (i == holeNum) {
            if (!hole) {
                arrObs.push([timeInt, setPosition(i), "same-box"])
            } else {
                arrObs.push([timeInt, setPosition(i), "coin"])
            }
        } else {
            arrObs.push([timeInt, setPosition(i), "blue-box"])
        }
    }

    function setPosition(i) {
        if (send == "reversed") {
            return intToPix((numBoxes - i) * bSize + (numBoxes - i + 1) * bMargin)
        } else {
            return intToPix(i * bSize + (i + 1) * bMargin);
        }
    }
}

// wall made out of two different element types ( boxes, coins, diamonds or powerup)

function mixedWall(type1, type2, tInt = 50) {
    for (let i = 0; i <= numBoxes; i++) {

        if (i % 2 == 0) {

            arrObs.push([tInt, intToPix(i * bSize + (i + 1) * bMargin), type1])
        } else {

            arrObs.push([tInt, intToPix(i * bSize + (i + 1) * bMargin), type2])

        }
    }
}

//create a snake using the obstacle wall
function snakeWall(num = 12, tInt = 150, arrayHoles = defaultHoles.slice(), holeBoolean = []) {

    if (holeBoolean.length == 0) {
        holeBoolean = populateArray(num, true);
    }

    holeBoolean[6] = false;
    for (let i = 0; i < num; i++) {
        if (i % 2 == 0) {
            obstacleWall(hole = holeBoolean[i], holeNum = arrayHoles[i], timeInt = tInt, send = "normal");
        } else {
            obstacleWall(hole = holeBoolean[i], holeNum = arrayHoles[i], timeInt = tInt, send = "reversed");
        }
    }
}


// adding some time until the next object
function wait(tInt) {
    addObject(1, tInt, randPos());
}

// tunnel of objects by concatenating walls

function tunnel(num, pos = 6) {
    for (i = 0; i < num; i++) {
        obstacleWall(holeNum = pos);
    }
}


// lader of coins
function coinLadder() {

    addObject(5, 300, "200px");
    addObject(5, 300, "250px");
    addObject(5, 300, "300px");
    addObject(5, 300, "450px;");
}

/*-------------------------------------------------
Functions used for random positioning of the objects in the screen
---------------------------------------------*/

function randObject(num, tInt, type = "coin") {

    for (let i = 0; i < num; i++) {
        arrObs.push([tInt, randPos(), type])
    }
}

function randPos() {
    return intToPix(getRandomInt(430));

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


/*---------------------------------------
UTILS
--------------------------------------*/


// from pixels to an integer
function pixToInt(pixels) {
    return Number(pixels.slice(0, pixels.length - 2));
}

// from an integer to pixels
function intToPix(integer) {
    return integer + "px";
}

/*-------------------------------------------------------
calculate element position assuming its size is 50 by 50
(some code not generalized in order to account for more speed in the game loop)
---------------------------------------------------------------*/

function position(element) {
    return [element.offsetTop + 25, element.offsetLeft, 25]
}

// element size
function size(element) {
    return [pixToInt(element.style.height), pixToInt(element.style.width)]
}

// populate an array with the same item and length l
function populateArray(l, item) {

    var array = [];
    for (i = 0; i < l; i++) {
        array.push(item);
    }

    return array;
}

// shuffle an array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// convert millis to mins and secs

function minSec(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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