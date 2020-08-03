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
var colors = ["rgba(0, 0, 255, 0.5)", "rgba(0,128,0, 0.5)", "rgba(255, 0, 0, 0.5)"]
var inputName = document.querySelector(".input-name");
var box = document.getElementById("myId");
var heartImg = document.querySelectorAll(".heart");
var cuentaAtras = document.querySelector("#cuenta-atras");
var stepForm = -1; // to be set at -1
var gameTimer;
//coins audio
var coinSound = document.getElementById('sound-coin');
var soundClick = document.getElementById('sound-click');
var soundStart = document.getElementById('sound-start');
// vars related to the current match being played, vars set to "easy" mode by default;
var currentUser;
var currentScore;
var currentLife = 3;
var currentKey;
var currentMode;
var currentCoins;
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
    currentMode = event.target.textContent;

}

function updateColor(event) {
    let currentColor = event.target.style.backgroundColor;
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

function startGame() {
    gameSection.classList.remove("hidden");
    document.onkeydown = detectKey;
    document.onkeyup = removeKey;
    setTimeout(pushObstacle, arrObs[0][0])
    let intHrames = setInterval(hFrames, 500);
    let intCframes = setInterval(cFrames, 200);
    keyLoop();
    // set a counter with 1 2 3 in the screen
}
/* start form completion */
nextStepForm();
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

//let collider = document.getElementById('collider');
console.log(box);
// game constraints
const gWidth = 1500;
const gHeight = 500;
const boxSize = pixToInt(box.style.width);
const marginGame = 5;
const limitBottom = gHeight - boxSize - marginGame;
const limitRight = gWidth - boxSize - marginGame;
const blueSize = 60; //  size blueBox
const bH2 = blueSize / 2
var vBox = 3;

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
            if (childGame[i].classList.contains("coin")) {
                currentCoins++;
                coinSound.play();
                coinSound.currentTime = 0
                console.log('coin-collision');
            } else {
                currentLife--;
            }
            childGame[i].remove();
        } else if (!borderLeft(childGame[i])) {
            childGame[i].remove()
        } else {
            childGame[i].style.marginLeft = (childGame[i].offsetLeft - vBox) + "px";
        }
    }
    setTimeout(keyLoop, 8);
}


/* create obstacles */

var numObs = 0;
var arrObs = [
    [1000, "100px", "diamond"],
    [3000, "250px", "blue-box"],
    [2000, "250px", "blue-box"],
    [50, "310px", "blue-box"],
    [50, "50px", "coin"],
    [500, "50px", "coin"],
    [500, "50px", "coin"],
    [500, "50px", "coin"],
    [500, "50px", "coin"],
    [500, "50px", "coin"],
    [500, "50px", "coin"],
    [500, "50px", "coin"],

];



// add a given number of coins

function addCoins(numCoins, interval, position) {
    for (let i = 0; i < numCoins; i++) {}
}


function pushObstacle() {
    let newObs = document.createElement('div');
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

// UTILS //

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
    return [element.offsetTop + 30, element.offsetLeft, 30]
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

let hFrame = 0;
let cFrame = 0;
let dFrame = 0;

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