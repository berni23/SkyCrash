var formTitle = document.querySelector(".form-title");
let stringUname = "username".split("");

displayLetters(stringUname, formTitle);

function displayLetters(charArray, element) {


    var counter = 0;
    var displayedString = "";
    var timer = setInterval(displayLetter, 200);


    function displayLetter() {

        displayedString += charArray[counter];
        element.textContent = displayedString;
        if (counter == charArray.length){
            clearInterval(timer);

        }
    }

}