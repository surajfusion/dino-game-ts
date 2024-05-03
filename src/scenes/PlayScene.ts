import Phaser from "phaser";
import { Ground, Sprite } from "../types";
import { Player } from "../entities/Player";

class PlayScene extends Phaser.Scene{
    player: Sprite;
    startTigger: Sprite;
    ground: Ground;
    shouldStartRoll: boolean;
    isGameRunning: boolean = false;
    
    constructor() {
        super("PlayScene");
    }

    get gameHeight() {
        return this.game.config.height as number;
    }

    get gameWidth() {
        return this.game.config.width as number;
    }
        
    create() {
        this.createEnvironment();
        this.createPlayer();
    }

    createPlayer() {
        this.player = new Player(this, 0, this.gameHeight, "dino-idle");

        this.physics.add.overlap(this.startTigger, this.player, ()=>{
            console.log('Collision Happens', this.startTigger.y)
            //Upper HIT
            if(this.startTigger.y === 30){
                this.startTigger.body.reset(0, this.gameHeight);
                return;
            }

            //Down HIT
            this.startTigger.body.reset(999,999);

            this.shouldStartRoll = true;

            const rolloutEvent = this.time.addEvent({
                delay: 1000/60,
                loop: true,
                callback: () =>{
                    // console.log('time', this.time);
                    this.player.setVelocityX(60);
                    
                    if(this.ground.width <= this.gameWidth){
                        this.ground.width += 20;
                        this.isGameRunning = true;
                    }else{
                        rolloutEvent.remove();
                        this.player.setVelocityX(0);
                        this.ground.width = this.gameWidth; 
                        this.isGameRunning = false;
                    }
                    
                }
            });
        });
    }
    
    createEnvironment() {
        this.ground = this.add
                        .tileSprite(0, this.gameHeight, 88, 26, "ground")
                        .setOrigin(0, 1);

        this.startTigger = this.physics.add
                .sprite(0, 30, null)
                .setAlpha(0)
                .setOrigin(0,1);
    }

    
    update(time: number, delta: number): void {
        //console.log('UPDATING');
        /* not needed because called in Player.ts
        //this.player.update();
        */
       
        /*
        functionality moved to the 
       if(this.shouldStartRoll){
        this.ground.width += 10;
       }
       */
    }
}

export default PlayScene;