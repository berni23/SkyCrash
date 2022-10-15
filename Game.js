class Game{



    constructor(user,waveManager){


        this.waveManager = waveManager
        this.user = user

        this.gameTimer = null;
        this.gameLoop = null;
        thiss.timeObstacle = null;
        this.intHframes = null ; 
        this.intCframes = null;
        this.numObs = 0;
    
        this.defaultHoles = [2, 3, 1, 4, 1, 3, 2, 2, 3, 1, 4, 1]; // array used in the creation of "enemies"
        this.numBoxes = 6; // number of boxes that will be sent in column
        this.bMargin = 15; //  margin between those boxes
        this.bSize = 50; // box size

        this.arrObs = [];





    }
}