class modeFactory{

    constructor(){
       
    }

    getMode(mode){

        switch(mode){
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