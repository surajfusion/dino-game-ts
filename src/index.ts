
import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import PreloadScene from "./scenes/PreloadScene";

export const PRELOAD_CONFIG = {
  cactusesCount : 6
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade:{
      debug: true
    }
  },
  scene: [PreloadScene, PlayScene]
};

new Phaser.Game(config);

