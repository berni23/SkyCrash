var formTitle = document.querySelector(".form-title");
var btnForm = document.querySelector("#button-form");
var btnReady = document.querySelector("#button-ready");
var buttonsMode = document.querySelector(".buttons-mode");
var childBtnsMode = buttonsMode.children;
var arrSteps = ["username".split(""), "choose mode".split(""), "choose color".split(""), "Are you ready".split("")];
var carouselColor = document.querySelector(".carousel-color");
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
    console.log(currentMode);
    console.log(Users[currentUser].mode);
}

function updateColor(event) {

    let currentColor = event.target.style.backgroundColor;
    console.log(currentColor);

    Users[currentUser].color = currentColor;
    console.log(currentColor);
    console.log(Users[currentUser].color);
}

btnForm.addEventListener("click", validateForm);

function validateForm() {

    switch (stepForm) {

        case 0: {

            let username = inputName.value;
            if (username != "") {

                createUser(username);
                showStep1Form();
                nextStepForm();

            }

            break;
        }
        case 1: {

            showStep2Form();
            nextStepForm();
            break;
        }

        case 2: {

            nextStepForm();
            showStep3Form();

            console.log("next step");

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

/* start form completion */

nextStepForm();