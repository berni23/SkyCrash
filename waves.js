
/*----------------------------------------------
functions for making easier the addition of obstacles and power ups
------------------------------------------------*/

// add a given number of objects
function addObject(num, interval, position = "250px", type = "coin") {
    for (let i = 0; i < num; i++) {
        arrObs.push([interval, position, type])
    }
}

// make a "wall" of objects, with a time interval and where will the hole be

function obstacleWall(hole = true, holeNum=null, timeInt = 50, send = "normal") {


    if (holeNum == null) {
        holeNum = Math.floor(numBoxes / 2)
    }
    for (let i = 0; i <= numBoxes; i++) {
        if (i == holeNum) {
            if (!hole) {
                arrObs.push([timeInt, setPosition(i,send), "same-box"])
            } else {
                arrObs.push([timeInt, setPosition(i,send), "coin"])
            }
        } else {
            arrObs.push([timeInt, setPosition(i,send), "blue-box"])
        }
    }
}


function thickWall(){

    for (let i = 0; i <= numBoxes; i++) {
      arrObs.push([50, setPosition(i), "blue-box"])

    }

}

function setPosition(i,send='normal') {
    if (send == "reversed") {
        return intToPix((numBoxes - i) * bSize + (numBoxes - i + 1) * bMargin)
    } else {
        return intToPix(i * bSize + (i + 1) * bMargin);
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
        holeBoolean[Math.floor(num / 2)] = false;
    }


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
        obstacleWall(true,pos);
    }
}


// lader of coins
function coinLadder() {

    addObject(5, 300, "200px");
    addObject(5, 300, "250px");
    addObject(5, 300, "300px");
    addObject(5, 300, "450px");
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



// adding some time until the next object
function wait(tInt) {
    addObject(1, tInt, randPos());
}



/// waves



function wave(){



}

function firstWave() {

    addObject(10, 300, "250px"); // if object not specified, it is a coin
    obstacleWall(true,5);
    wait(3000);
    addObject(1, 600, "250px", "blue-box")
    obstacleWall(true, 10);
    obstacleWall(true, 2);
    wait(2000);
    obstacleWall(true, 2, 100, "reversed");
    wait(2000);
    obstacleWall(true, 3, 100);
    snakeWall(10, 150, arrayHoles = [2, 3, 1, 5, 3, 2, 2, 3, 4, 1]);
    addObject(1, 300, "250px", "diamond");
    randObject(4, 300, "blue-box");
    randObject(100, 50);
    // randObject(1, 20, "same-box");
    randObject(40, 200, "blue-box");
    wait(2000);
    mixedWall("blue-box", tInt = 50);
    snakeWall(5, 100);

    wait(1000);
    addObject(1, 50, "250px", "diamond");
    addObject(1, 250, "250px", "blue-box");
    coinLadder();
}

function secondWave() {
    snakeWall();
    obstacleWall(true, 100);
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

    snakeWall(15, 140, shuffle( [0, 5, 1, 5, 1, 4, 1, 4, 1, 5, 0, 5, 1, 4, 2]), holeBoolean = populateArray(15, true))
    coinLadder();

}


function superThickWall(){

    thickWall()
    thickWall()
    thickWall()
    thickWall()
}

function berniWave(){
    

    thickWall();
    snakeWall(10, 160, [1, 5, 1, 5, 2, 4, 2, 4, 3,3],[true,true, true,true,true,true, true,true,true,true]);
    tunnel(10, 3);
    randObject(3,200,'fast-blue-box')
    randObject(5,20,'coin')
    obstacleWall(true, 4);
    wait(300)
    coinLadder();
    coinLadder();
    duplicateAndShuffle();
    
    snakeWall(15, 140, [1,4,5,2,3,1,2,4,5,3], populateArray(10, true))
    addObject(1, 300, '200px','same-box');
    addObject(1, 200, '300px','same-box');


}

function duplicateAndShuffle(){

    let duplication = shuffle(Object.assign([],arrObs))
    arrObs = arrObs.concat(duplication)

}