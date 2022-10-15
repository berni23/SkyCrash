import UserManager from "./User/UserManager.js";

export default class SectionManager {

    constructor(renderer, storeManager) {

        this.stepForm = -1
        this.renderer = renderer
        this.storeManager = storeManager
        this.userManager = new UserManager(storeManager, renderer);

    }
    validateForm() {
        switch (this.stepForm) {
            case 0: { // username
                this.createUser();
                break;
            }
            case 1: { //mode

                this.chooseMode();
                break;
            }
            case 2: { // choose color


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
                return;

            }
        }
        this.effectsInBetween();
        this.nextStepForm();

    }


    effectsInBetween() {
        this.renderer.soundClick.play();
        this.renderer.soundClick.currentTime = 0;
    }

    createUser() {
        let username = this.renderer.getUserName();
        if (!this.userManager.validateUsername(username)) return
        this.userManager.createUserAndSetAsCurrent(username);

    }

    chooseMode() {
        let input = this.renderer.currentModeInput;
        this.userManager.setCurrentUserMode(input)
    }


    nextStepForm() {
        this.stepForm++;
        this.renderer.displayLetters(stepForm);
        this.renderer.showStepCallbacks[stepForm]();
    }


}
