export default class ModeFactory{

    constructor(){

    }

    getMode(mode){
        switch(mode.toUpperCase()){
            case 'MEDIUM' :{
                return new MediumMode();
            }
            case 'HARD': {
                return new HardMode();
            }
        }
        return new EasyMode();
    }
}
