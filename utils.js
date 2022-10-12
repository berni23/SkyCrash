

/*---------------------------------------
UTILS
--------------------------------------*/

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



/* detection of W/A/S/D keys */

function detectKey(e) {
    if (e.keyCode == '87' || e.keyCode == '83' || e.keyCode == '65' || e.keyCode == '68') {
        currentKey = e.keyCode;
    }
}




function clickButtonIfEnter(button){

    console.log('click')
    document.onkeyup = function(e){
        if(e.key=='Enter'){
            button.click();

        }
    }


}
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
