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
var stepForm = -1;
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

    keyLoop();
    // set a counter with 1 2 3 in the screen
}

/* start form completion */

nextStepForm();


/*experiment with the game*/

var currentKey;

function detectKey(e) {

    if (e.keyCode == '87' || e.keyCode == '83' || e.keyCode == '65' || e.keyCode == '68') {
        currentKey = e.keyCode
    }
}

function removeKey(e) {


    console.log("inside removeKey function")

    if (e.keyCode == currentKey) {
        currentKey = undefined;

        console.log("currentKey removed");
    }
}

function keyLoop() {
    var posLeft = document.getElementById('myId').offsetLeft;
    var posTop = document.getElementById('myId').offsetTop;
    if (currentKey == '87') {
        // up arrow
        document.getElementById('myId').style.marginTop = (posTop - 5) + "px";
    } else if (currentKey == '83') {
        // down arrow
        document.getElementById('myId').style.marginTop = (posTop + 5) + "px";
    } else if (currentKey == '65') {
        // left arrow
        document.getElementById('myId').style.marginLeft = (posLeft - 5) + "px";
    } else if (currentKey == '68') {
        // right arrow
        document.getElementById('myId').style.marginLeft = (posLeft + 5) + "px";
    }

    setTimeout(keyLoop, 10);
}