import Phaser from "phaser";
import { Sprite } from "../types";
import { Player } from "../entities/Player";

class PlayScene extends Phaser.Scene{
    player: Sprite;
    startTigger: Sprite;
    
    constructor() {
        super("PlayScene");
    }

    get gameHeight() {
        return this.game.config.height as number;
    }
        
    create() {
        this.createEnvironment();
        this.createPlayer();
        this.registerPlayerControl();
        
    }
    createPlayer() {
        this.player = new Player(this, 0, this.gameHeight, "dino-idle");

        this.physics.add.overlap(this.startTigger, this.player, ()=>{
            console.log('Collision Happens')
        });
    }
    
    createEnvironment() {
        this.add
            .tileSprite(0, this.gameHeight, 4000, 26, "ground")
            .setOrigin(0, 1);

        this.startTigger = this.physics.add
                .sprite(0, 30, null)
                .setAlpha(0)
                .setOrigin(0,1);
    }

    registerPlayerControl(){
        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on("down", () => {
            this.player.setVelocityY(-1000);
        });
    }
}

export default PlayScene;