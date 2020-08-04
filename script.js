var mainSection = document.querySelector(".main");
var gameContainer = document.querySelector(".game");
var gameSection = document.querySelector(".game-wrapper");
var formTitle = document.querySelector(".form-title");
var btnForm = document.querySelector("#button-form");
var btnReady = document.querySelector("#button-ready");
var buttonsMode = document.querySelector(".buttons-mode");
var childBtnsMode = buttonsMode.children;
var carouselColor = document.querySelector(".carousel-color");
var arrSteps = ["username".split(""), "choose mode".split(""), "choose color".split(""), "Are you ready".split("")];
var colors = ["rgba(191, 85, 236, 0.8)", "rgba(0,128,0, 0.8)", "rgba(255, 0, 0, 0.8)"]
var inputName = document.querySelector(".input-name");
var box = document.getElementById("myId");
var heartImg = document.querySelectorAll(".heart");
var cuentaAtras = document.querySelector("#cuenta-atras");
var stepForm = -1; // to be set at -1
var gameTimer;
//coins audio
var coinSound = document.getElementById('sound-coin');
var soundPup = document.getElementById('sound-powerup');
var soundClick = document.getElementById('sound-click');
var soundStart = document.getElementById('sound-start');
var numCoins = document.querySelector(".coin-number");
// vars related to the current match being played, vars set to "easy" mode by default;
var currentUser;
var currentScore;
var currentLife = 3;
var currentKey;
var currentMode;
var currentColor = colors[0];


var numBoxes = 6; //array wise! ( real number minus 1)
var bMargin = 15;
var bSize = 50;

var Users = {

}


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

for (let i = 0; i < childBtnsMode.length; i++) {
    childBtnsMode[i].addEventListener("click", updateMode);
}

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

btnForm.addEventListener("click", validateForm);
btnReady.addEventListener("click", validateForm);

function validateForm() {
    switch (stepForm) {
        case 0: { // username
            let username = inputName.value;
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
            //startGame();
            soundStart.play();
            counterBack(cuentaAtras);
            mainSection.classList.add("hidden");
            break;
        }
    }
}
let cBack = ["3", "2", "1", "0", "GO!", ""];

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

let intHrames;
let intCframes;
let gameLoop;

function startGame() {
    gameSection.classList.remove("hidden");
    document.onkeydown = detectKey;
    document.onkeyup = removeKey;
    initializeLoops();
    setTimeout(pushObstacle, arrObs[0][0])

}

function initializeLoops() {

    let intHrames = setInterval(hFrames, 500);
    let intCframes = setInterval(cFrames, 200);
    let gameLoop = setInterval(keyLoop, gameInt);

}
/* start form completion */
nextStepForm();

var numObs = 0;
var arrObs = [];
includeObjects();
/* game logic implementation*/


function detectKey(e) {
    if (e.keyCode == '87' || e.keyCode == '83' || e.keyCode == '65' || e.keyCode == '68') {
        currentKey = e.keyCode;
    }
}

function removeKey(e) {
    if (e.keyCode == currentKey) {
        currentKey = undefined;
    }
}

// game constraints
const gWidth = 1500;
const gHeight = 500;
const boxSize = pixToInt(box.style.width);
const marginGame = 5;
const limitBottom = gHeight - boxSize - marginGame;
const limitRight = gWidth - boxSize - marginGame;
const bH2 = boxSize / 2
var vBox = 4;
const gameInt = 10 // gameInterval
box.style.marginLeft = "750px";
box.style.marginTop = "250px";

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
    //collision(box, collider);

    for (i = 1; i < childGame.length; i++) {

        if (collision(box, childGame[i])) {
            console.log(currentLife);

            if (childGame[i].classList.contains("blue-box") && !power) {
                currentLife--;
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
                setTimeout(pUpFinished, 6000);
            }
            childGame[i].remove();
        } else if (!borderLeft(childGame[i])) {
            childGame[i].remove();
        } else {
            childGame[i].style.marginLeft = (childGame[i].offsetLeft - vBox) + "px";
        }
    }
}
/* create obstacles */

function includeObjects() {

    addObject(10, 300, "250px"); // if object not specified, it is a coin
    obstacleWall(hole = false);
    addObject(1, 5000, "250px");
    addObject(1, 600, "250px", "blue-box")
    obstacleWall(true, 2);
    obstacleWall(false, 2);
    addObject(1, 2000, "400px");
    obstacleWall(true, 2, timeInt = 100, send = "reversed");
    addObject(1, 2000, "80px");
    obstacleWall(true, 3, timeInt = 100);
    snakeWall(12, [2, 3, 1, 5, 1, 3, 2, 2, 3, 1, 4, 1], tInt = 150);
    addObject(1, 300, "250px", "diamond");
    randObject(4, 300, "blue-box");
    randObject(100, 50);
    addObject(1, 500, "250px");
    addObject(1, 50, "50px", "same-box");
    addObject(1, 50, "100px", "blue-box");
    addObject(1, 50, "150px", "same-box");
    addObject(1, 50, "200px", "blue-box");
    addObject(1, 50, "250px", "same-box");
    addObject(1, 50, "250px", "blue-box");
    randObject(40, 200, "blue-box");
    addObject(1, 2000, "400px");
    // mixedWall("blue-box", "same-box", tInt = 50)


}

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

    if (numObs < arrObs.length) {
        setTimeout(pushObstacle, arrObs[numObs][0]);
    }
}

// add a given number of coins
function addObject(num, interval, position, type = "coin") {
    for (let i = 0; i < num; i++) {
        arrObs.push([interval, position, type])
    }

}



function obstacleWall(hole = true, holeNum = "undefined", timeInt = 50, send = "normal") {

    if (holeNum == 'undefined') {
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

function mixedWall(type1, type2, tInt = 50) {

    for (let i = 0; i <= numBoxes; i++) {

        if (i % 2 == 0) {

            arrObs.push([tInt, intToPix(i * bSize + (i + 1) * bMargin), type1])
        } else {

            arrObs.push([tInt, intToPix(i * bSize + (i + 1) * bMargin), type2])

        }

    }

}

function snakeWall(num, holes, tInt = 50) {

    for (let i = 0; i < num; i++) {
        if (i % 2 == 0) {
            obstacleWall(hole = true, holeNum = holes[i], timeInt = tInt, send = "normal");
        } else {
            obstacleWall(hole = true, holeNum = holes[i], timeInt = tInt, send = "reversed");
        }
    }
}

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
// UTILS //

var power = false;

function pUpFinished() {

    box.classList.remove("power-up");
    power = false;
}

function pixToInt(pixels) {
    return Number(pixels.slice(0, pixels.length - 2));
}

function intToPix(integer) {
    return integer + "px";
}

function position(element) {
    //let h2 = pixToInt(element.style.height) / 2
    //let w2 = pixToInt(element.style.width) / 2
    // size halfs hard coded
    return [element.offsetTop + 25, element.offsetLeft, 25]
}

function size(element) {
    return [pixToInt(element.style.height), pixToInt(element.style.width)]
}

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

// frames for powerUps (coins, lives , diamonds)
var hFrame = 0;
var cFrame = 0;
var dFrame = 0;

function hFrames() {
    heartImg.forEach(h => {
        h.style.backgroundImage = `url('assets/images/heart${hFrame}.png')`
    })
    hFrame = (hFrame + 1) % 4;
}

function cFrames() {
    let coinImg = document.querySelectorAll(".coin");
    coinImg.forEach(c => {
        c.style.backgroundImage = `url('assets/images/coin_${cFrame}.png')`;
    })

    cFrame = (cFrame + 1) % 8;
    dFrames(); // both executed simulaneously , so we don't call an extra timer;

}

function dFrames() {
    let diamondImg = document.querySelectorAll(".diamond");
    diamondImg.forEach(d => {
        d.style.backgroundImage = `url('assets/images/diamond${dFrame}.png')`;
    })
    dFrame = (dFrame + 1) % 4
}

/* let posLeft = document.getElementById('myId').style.offsetLeft;
let posTop = document.getElementById('myId').style.offsetTop;
let mLeft = document.getElementById('myId').style.marginLeft;
let mTop = document.getElementById('myId').style.marginTop;
 */