import { Physics } from "phaser";


export class Player extends Phaser.Physics.Arcade.Sprite{
    
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    isSpaceJustDown: Boolean 
    
    constructor(scene: Phaser.Scene, x: number, y: number, key: string){
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
            .setBodySize(44,92);
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
        const {space} = this.cursors;
        //Helps to get the only one, if you hold the key still it will be one.
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();        
        console.log('Player', space.isDown, isSpaceJustDown);
        if(isSpaceJustDown && onFloor){
            this.setVelocityY(-1600 );
        }
        
    }
}