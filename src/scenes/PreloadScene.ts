import Phaser from "phaser";
import { PRELOAD_CONFIG } from "..";

class PreloadScene extends Phaser.Scene{

    constructor(){
        super('PreloadScene');
    }

    preload () {
        this.load.image('ground', 'assets/ground.png');
        this.load.image('dino-idle', 'assets/dino-idle-2.png');

        for(let i = 1; i <= PRELOAD_CONFIG.cactusesCount; i++){
            this.load.image(`obstacle_${i}`, `assets/cactuses_${i}.png`);
        }

        this.load.spritesheet('dino-run','assets/dino-run.png',{
            frameWidth: 88,
            frameHeight: 92
        });
    }

    create(){
        this.scene.start('PlayScene');
    }

}

export default PreloadScene;
