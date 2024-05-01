import { Physics } from "phaser";


export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number, key: string){
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    init(){
        this.setOrigin(0, 1)
            .setGravityY(1200)
            .setCollideWorldBounds(true)
            .setBodySize(44,92);

        this.registerPlayerControl();
    }

    registerPlayerControl(){
        const spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on("down", () => {
            this.setVelocityY(-1000);
        });
    }

    update(){
        console.log('Player');
    }
}