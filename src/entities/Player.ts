import { Physics } from "phaser";
import GameScene from "../scenes/GameScene";


export class Player extends Phaser.Physics.Arcade.Sprite{
    
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    isSpaceJustDown: Boolean;
    scene: GameScene;

    //Replace Phase.Scene with GameScene.
    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    init(){
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setOrigin(0, 1)
            .setGravityY(5000)
            .setCollideWorldBounds(true)
            .setBodySize(44,92)
            .setOffset(20,0);

        this.registerAnimations();
    }

    /*
    //Not needed because we are using update event
    registerPlayerControl(){
        const spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on("down", () => {
            this.setVelocityY(-1000);
        });
    }
    */

    update(){
        const {space, down} = this.cursors;
        //Helps to get the only one, if you hold the key still it will be one.
        const isSpaceJustPress = Phaser.Input.Keyboard.JustDown(space);
        const isDownJustPress = Phaser.Input.Keyboard.JustDown(down);
        const isDownJustRelease = Phaser.Input.Keyboard.JustUp(down);

        const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();        
        //console.log('Player', space.isDown, isSpaceJustPress);
        if(isSpaceJustPress && onFloor){
            this.setVelocityY(-1600);
        }

        if(isDownJustPress && onFloor){
            this.body.setSize(this.body.width, 58);
            this.setOffset(20,0);
        }

        if(isDownJustRelease && onFloor){
            this.body.setSize(44, 92);
            this.setOffset(20,0);
        }

        if(!this.scene.isGameRunning){
            //this.stopRunAnimation();
            return;
        }

        if(this.body.deltaAbsY() > 0){
            //this.stopRunAnimation();
        }else{
            this.playRunAnimation();
        }
    }

    playRunAnimation(){
        console.log('Height', this.body.height);
        if(this.body.height <= 58){
            this.play("dino-down", true);
        }else{
            this.play("dino-run", true);
        }
        
    }

    stopRunAnimation(){
        this.anims.stop();
        this.setTexture("dino-run", 0);
    }


    registerAnimations(){
        this.scene.anims.create({
            key: "dino-run",
            frames: this.scene.anims.generateFrameNames("dino-run", {start:2, end:3}),
            frameRate: 10,
            repeat: -1,
        });
        
        this.scene.anims.create({
            key: "dino-stand",
            frames: this.scene.anims.generateFrameNames("dino-run", {start:0, end:1}),
            frameRate: 10,
            repeat: -1,
        });


        this.scene.anims.create({
            key: "dino-down",
            frames: this.scene.anims.generateFrameNames("dino-down"),
            frameRate: 10,
            repeat: -1,
        });
    }

    playerDie(){
        this.anims.pause();
        this.setTexture("dino-hurt");
    }
}