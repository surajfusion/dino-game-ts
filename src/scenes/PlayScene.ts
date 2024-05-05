import Phaser from "phaser";
import { ArcadeGroup, Ground, Sprite } from "../types";
import { Player } from "../entities/Player";
import GameScene from "./GameScene";
import { PRELOAD_CONFIG } from "..";

class PlayScene extends GameScene {
    player: Sprite;
    startTigger: Sprite;
    ground: Ground;
    shouldStartRoll: boolean;
    obstacles: ArcadeGroup;

    spawnInterval: number = 1500;
    spawnTime: number = 0;
    obstacleSpeed: number = 7;

    constructor() {
        super("PlayScene");
    }

    create() {
        this.createEnvironment();
        this.createObjstacles();
        this.createPlayer();
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
       if(!this.isGameRunning) return;

       this.spawnTime += delta;
       if(this.spawnTime >= this.spawnInterval){
            this.spawnTime = 0;
            this.spawnObstables();
       }

       Phaser.Actions.IncX(this.obstacles.getChildren(), -this.obstacleSpeed);
       //This method is used to remove the obstacle is that is out of screen.
       this.removeObstacle();
    }

    createPlayer() {
        this.player = new Player(this, 0, this.gameHeight, "dino-run");

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
                    this.player.setVelocityX(60);
                    
                    if(this.ground.width <= this.gameWidth){
                        this.ground.width += 20;
                        this.isGameRunning = true;
                    }else{
                        rolloutEvent.remove();
                        this.player.setVelocityX(0);
                        this.ground.width = this.gameWidth; 
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

    createObjstacles(){
        this.obstacles = this.physics.add.group();
    }

    spawnObstables(){
        const obstacleNum = Math.floor(Math.random() * PRELOAD_CONFIG  .cactusesCount) + 1;
        const dist_obstacle = Phaser.Math.Between(600, 900);

        this.obstacles
            .create(dist_obstacle, this.gameHeight, `obstacle_${obstacleNum}`)
            .setOrigin(0,1);
            //.setVelocityX(-500); move to the obstacle speed.
    }
    
    removeObstacle(){
        this.obstacles.getChildren().forEach((obstacle: Sprite)=>{
            if(obstacle.getBounds().right <= 0){
                this.obstacles.remove(obstacle);
            }
        });
    }
}

export default PlayScene;