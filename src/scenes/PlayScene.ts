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

    gameOverText: Phaser.GameObjects.Image;
    restartText: Phaser.GameObjects.Image;
    gameOverContainer: Phaser.GameObjects.Container;

    spawnInterval: number = 1500;
    spawnTime: number = 0;
    gameSpeed: number = 15;

    constructor() {
        super("PlayScene");
    }

    create() {
        this.createEnvironment();
        this.createObjstacles();
        this.createPlayer();
        
        this.createGameOverScreen();
        this. handleGameStart();
        this.handleRestart();

        this.handleObstacleCollisions();
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

       Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
       //This method is used to remove the obstacle is that is out of screen.
       this.removeObstacle();
       this.moveGround();
    }

    createPlayer() {
        this.player = new Player(this, 0, this.gameHeight, "dino-run");
    }
    
    createEnvironment() {
        this.ground = this.add
                        .tileSprite(0, this.gameHeight, 88, 26, "ground")
                        .setOrigin(0, 1);

        
    }

    createObjstacles(){
        this.obstacles = this.physics.add.group();
    }

    createGameOverScreen(){
        this.gameOverText = this.add.image(0,0,'gameover');
        this.restartText = this.add.image(0,80,'restart').setInteractive();

        this.gameOverContainer = this.add.container(this.gameWidth/2, (this.gameHeight/2)-50)
            .add([this.gameOverText, this.restartText])
            .setAlpha(0);
    }

    handleRestart(){
        this.restartText.on("pointerdown", () =>{
            //console.log('Restart Clicked');
            this.handleGameRestart();
        });
    }

    spawnObstables(){
        const obstacleNum = Math.floor(Math.random() * PRELOAD_CONFIG  .cactusesCount) + 1;
        const dist_obstacle = Phaser.Math.Between(600, 900);

        const obstacles = this.obstacles
            .create(dist_obstacle, this.gameHeight, `obstacle_${obstacleNum}`)
            .setOrigin(0,1)
            .setImmovable();
            //.setVelocityX(-500); move to the obstacle speed.
    }
    
    removeObstacle(){
        this.obstacles.getChildren().forEach((obstacle: Sprite)=>{
            if(obstacle.getBounds().right <= 0){
                this.obstacles.remove(obstacle);
            }
        });
    }

    moveGround(){
        this.ground.tilePositionX += this.gameSpeed;
    }

    handleGameStart(){
        this.startTigger = this.physics.add
                .sprite(0, 30, null)
                .setAlpha(0)
                .setOrigin(0,1);
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

    handleObstacleCollisions(){
        this.physics.add.collider(this.obstacles, this.player,  ()=>{
            this.physics.pause;
            this.player.anims.pause();
            this.player.setTexture("dino-hurt");
            this.isGameRunning = false;
            this.gameOverContainer.setAlpha(1);
            this.spawnTime = 0;
            this.gameSpeed = 10;
        });
    }

    handleGameRestart(){
        this.physics.resume();
        this.player.setVelocityY(0);
        this.obstacles.clear(true, true);
        this.gameOverContainer.setAlpha(0);
        this.isGameRunning = true;
    }
}

export default PlayScene;