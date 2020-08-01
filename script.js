var formTitle = document.querySelector(".form-title");
var btnForm = document.querySelector(".button-start");
console.log(btnForm);
var buttonsMode = document.querySelector(".buttons-mode");
var childBtnsMode = buttonsMode.children;

console.log(childBtnsMode);
var arrStrings = ["username".split(""), "choose mode".split("")];
var inputName = document.querySelector(".input-name");
var stepForm = -1;
var currentUser;
var Users = {

}

function nextStepForm() {

    displayLetters(arrStrings[stepForm + 1], formTitle);
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

    let user = {
        username: newUser,
        mode: "EASY",
        plane: "red",
        time: undefined,
        score: 0
    }
    Users[newUser] = user;
    currentUser = newUser;
}

for (let i = 0; i < childBtnsMode.length; i++) {

    childBtnsMode[i].addEventListener("click", updateMode);
    console.log(childBtnsMode[i]);

}


function updateMode(event) {

    let currentMode = event.target.textContent;
    Users[currentUser].mode = currentMode;
    console.log(currentMode);
}

btnForm.addEventListener("click", validateForm);

function validateForm() {

    switch (stepForm) {

        case 0: {

            let username = inputName.value;
            if (username != "") {

                createUser(username);
                showStep1Form();

            }

            break;
        }
        case 1: {

            showStep2Form();
            break;
        }
    }

    nextStepForm();
}


function showStep1Form() {

    inputName.classList.add("hidden");
    buttonsMode.classList.remove("hidden");

}

function showStep2Form() {

    buttonsMode.classList.add("hidden");

}


/* start form completion */


nextStepForm();