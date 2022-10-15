import UserManager from "./User/UserManager.js";

export default class SectionManager {

    constructor(renderer, storeManager) {

        this.stepForm = -1
        this.renderer = renderer
        this.storeManager = storeManager
        this.userManager = new UserManager(storeManager, renderer);

    }


    effectsInBetween() {
        this.renderer.soundClick.play();
        this.renderer.soundClick.currentTime = 0;
    }

    logicFirstSection() {
        let username = this.renderer.getUserName();
        if (!this.userManager.validateUsername(username)) return
         this.userManager.createUserAndSetAsCurrent(username);

    }

    validateForm() {
        switch (this.stepForm) {
            case 0: { // username
                let username = inputName.value;
                inputName.value = "";

                if (username != "") {
                    createUser(username);
                    nextStepForm();
                    soundClick.play();
                    soundClick.currentTime = 0;
                }
                break;
            }
            case 1: { //mode

                Users[currentUser].mode = currentMode;
                nextStepForm();
                updateLife();
                soundClick.play();
                soundClick.currentTime = 0;

                break;
            }
            case 2: { // choose color

                nextStepForm();
                box.style.backgroundColor = Users[currentUser].color;
                soundClick.play();
                soundClick.currentTime = 0;
                break;
            }

            case 3: { // start game
                soundStart.play();
                counterBack(cuentaAtras);
                mainSection.classList.add("hidden");
                btnTutorial.classList.add("hidden");
                includeObjects();
                addObject(1, 200, "250px", 'blue-box')
                break;
            }
        }

    }


}
