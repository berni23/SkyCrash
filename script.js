var mainSection = document.querySelector(".main");
var gameSection = document.querySelector(".game");
var formTitle = document.querySelector(".form-title");
var btnForm = document.querySelector("#button-form");
var btnReady = document.querySelector("#button-ready");
var buttonsMode = document.querySelector(".buttons-mode");
var childBtnsMode = buttonsMode.children;
var carouselColor = document.querySelector(".carousel-color");
var arrSteps = ["username".split(""), "choose mode".split(""), "choose color".split(""), "Are you ready".split("")];
var colors = ["rgba(0, 0, 255, 0.5)", "rgba(0,128,0, 0.5)", "rgba(255, 0, 0, 0.5)"]
var inputName = document.querySelector(".input-name");
var stepForm = 2; // to be set at -1
var currentUser;
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
        color: "red",
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
    let currentMode = event.target.textContent;
    Users[currentUser].mode = currentMode;
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
            }
            break;
        }
        case 1: { //choose color

            showStep2Form();
            nextStepForm();
            break;
        }
        case 2: { // are u ready?

            nextStepForm();
            showStep3Form();
            console.log("are u ready?")
            break;
        }

        case 3: { // start game
            startGame();
            break;
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
"1"

function showStep3Form() {
    carouselColor.classList.add("hidden");
    btnForm.classList.add("hidden");
    btnReady.classList.remove("hidden");
}

function startGame() {
    mainSection.classList.add("hidden");
    gameSection.classList.remove("hidden")
    document.onkeydown = detectKey;
    document.onkeyup = removeKey;
    setTimeout(pushObstacle, arrObs[0][0])

    keyLoop();
    // set a counter with 1 2 3 in the screen
}

/* start form completion */
nextStepForm();
/* game logic implementation*/

var currentKey;

function detectKey(e) {
    if (e.keyCode == '87' || e.keyCode == '83' || e.keyCode == '65' || e.keyCode == '68') {
        currentKey = e.keyCode
    }
}

function removeKey(e) {
    if (e.keyCode == currentKey) {
        currentKey = undefined;
    }
}

//let collider = document.getElementById('collider');
let box = document.getElementById("myId");
console.log(box);
// game constraints
const gWidth = 1500;
const gHeight = 500;
const boxSize = pixToInt(box.style.width);
const marginGame = 5;
const limitBottom = gHeight - boxSize - marginGame;
const limitRight = gWidth - boxSize - marginGame;

box.style.marginLeft = "750px";
box.style.marginTop = "250px";

function keyLoop() {
    let posLeft = box.offsetLeft;
    let posTop = box.offsetTop;
    //let posTop2 = collider.offsetTop;
    if (currentKey == '87' && borderTop(box)) {
        box.style.marginTop = (posTop - 5) + "px";
    } else if (currentKey == '83' && borderBottom(box)) {
        box.style.marginTop = (posTop + 5) + "px";
    } else if (currentKey == '65' && borderLeft(box)) {
        box.style.marginLeft = (posLeft - 5) + "px";
    } else if (currentKey == '68' && borderRight(box)) {
        box.style.marginLeft = (posLeft + 5) + "px";
    }
    //collision(box, collider);
    for (el of currentObs) {

        if (borderLeft(el)) {
            el.style.marginLeft = (el.offsetLeft - 5) + "px";

        } else {

            el.remove();
        }
    }

    setTimeout(keyLoop, 10);
}

/* create obstacles */

var numObs = 0;
var arrObs = [
    [3000, "250px"],
    [2000, "250px"],
    [1000, "310px"]
];

var currentObs = [];

function pushObstacle() {

    let blueBox = document.createElement('div');
    blueBox.classList.add("blue-box");
    /*blueBox.style.backgroundColor = "blue";
    blueBox.classList.add("box");
    blueBox.style.width = "60px";
    blueBox.style.height = "60px";
    blueBox.style.marginLeft = "1480px";
    */
    blueBox.style.marginLeft = "1480px";
    blueBox.id = "obstacle" + numObs;
    blueBox.style.marginTop = arrObs[numObs][1];


    gameSection.appendChild(blueBox);
    currentObs.push(document.getElementById("obstacle" + numObs))
    numObs++;

    if (numObs < arrObs.length) {
        console.log(numObs);
        console.log(arrObs[numObs][0]);
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
    let h2 = pixToInt(element.style.height) / 2
    //let w2 = pixToInt(element.style.width) / 2
    return [element.offsetTop + h2, element.offsetLeft + h2, h2]
}

function size(element) {
    return [pixToInt(element.style.height), pixToInt(element.style.width)]
}

function collision(element1, element2) {
    p1 = position(element1);
    p2 = position(element2);
    if (Math.abs(p1[0] - p2[0]) <= (p1[2] + p2[2]) && Math.abs(p1[1] - p2[1]) <= (p1[2] + p2[2])) {
        console.log("collision!");
    }
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


/* let posLeft = document.getElementById('myId').style.offsetLeft;
 let posTop = document.getElementById('myId').style.offsetTop;

 let mLeft = document.getElementById('myId').style.marginLeft;
 let mTop = document.getElementById('myId').style.marginTop;

 */