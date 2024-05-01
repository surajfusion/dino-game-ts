import Phaser from "phaser";

class PlayScene extends Phaser.Scene{
    player: Phaser.Physics.Arcade.Sprite;
    
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
        this.player = this.physics.add
                        .sprite(0, this.gameHeight, "dino-idle")
                        .setOrigin(0, 1);
    }
    createEnvironment() {
        this.add
            .tileSprite(0, this.gameHeight, 800, 26, "ground")
            .setOrigin(0, 1);
    }

    registerPlayerControl(){
        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on("down", () => {
            this.player.setVelocityY(-400);
        });
    }
}

export default PlayScene;