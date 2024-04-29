import Phaser from "phaser";

type Person = {
    name: string;
    age: Number;
    displayAge: () => void;
    getName: () => string;
    welcomePerson: (welcome: string) => String;
};

class PlayScene extends Phaser.Scene{
    person: Person;

    constructor() {
        super("PlayScene");
    }
    get gameHeight() {
        return this.game.config.height as number;
    }
        
    create() {
        this.createEnvironment();
        this.createPlayer();

        this.person = {
            name: "Suraj",
            age: 30,
            displayAge() {
                console.log(this.age);
            },
            getName() {
                return this.name;
            },
            welcomePerson(welcome) {
                return welcome + ' ' + this.name;
            },
        };
    }
    createPlayer() {
        this.physics.add
            .sprite(0, this.gameHeight, "dino-idle")
            .setOrigin(0, 1);
    }
    createEnvironment() {
        this.add
            .tileSprite(0, this.gameHeight, 800, 26, "ground")
            .setOrigin(0, 1);
    }
}

export default PlayScene;