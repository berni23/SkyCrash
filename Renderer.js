


export default class Renderer{

    constructor(){


        this.selectSections()
        this.selectButtons()
        this.selectAudioEffects()
        this.initColors();

        //others
        this.formTitle = document.querySelector(".form-title");
        this.carouselColor = document.querySelector(".carousel-color");
        this.arrSteps = ["username".split(""), "choose mode".split(""), "choose color".split(""), "Are you ready".split("")];
        this.colors = ["rgba(191, 85, 236, 0.8)", "rgba(0,128,0, 0.8)", "rgba(255, 0, 0, 0.8)"]
        this.inputName = document.querySelector(".input-name");
        this.box = document.getElementById("myId");
        this.livesStatus = document.querySelector(".lives");
        this.countDown = document.querySelector("#cuenta-atras");

    }


    getUserName(){
         let username =  this.inputName.value
         inputName.value = "";
         return username

    }



    selectSections(){

        this.mainSection = document.querySelector(".main");
        this.gameContainer = document.querySelector(".game");
        this.gameSection = document.querySelector(".game-wrapper");
        this.tutorialSection = document.querySelector(".tutorial");
        this.gameFinished = document.querySelector(".game-finished");
        this.childTutorial = tutorialSection.children;


    }

    selectButtons(){


        this.btnForm = document.querySelector("#button-form");
        this.btnReady = document.querySelector("#button-ready");
        this.btnBackMain = document.querySelector("#back-main");
        this.btnTryAgain = document.querySelector("#try-again");
        this.btnTutorial = document.querySelector("#button-tutorial");
        this.btnTutorialNext = document.querySelector("#tutorial-next");
        this.btnTutorialBack = document.querySelector("#tutorial-back");
        this.buttonsMode = document.querySelector(".buttons-mode");
        this.childBtnsMode = buttonsMode.children;

    }
      selectAudioEffects() {

            //audio effects
            this.coinSound = document.getElementById('sound-coin');
            this.soundPup = document.getElementById('sound-powerup');
            this.soundClick = document.getElementById('sound-click');
            this.soundStart = document.getElementById('sound-start');
            this.numCoins = document.querySelector(".coin-number");


    }


    initColors(){


        this.colors.forEach(color => {

            let li = document.createElement("li");
            let btnColor = document.createElement("button");
            btnColor.style.backgroundColor = color;
            btnColor.style.width = "60px";
            btnColor.style.height = "60px";
            btnColor.addEventListener("click", updateColor)
            li.appendChild(btnColor);
            carouselColor.appendChild(li);

        })


    }

}
