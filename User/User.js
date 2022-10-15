export default class User{


    constructor(username){

        this.username = username;
        this.score = 0
        this.mode = new EasyMode()
    }


    setMode(modeName){

        let factory = new ModeFactory()
        this.mode = factory.getMode(modeName);
    }


}
