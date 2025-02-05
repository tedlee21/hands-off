import '../style.css'
import Phaser from 'phaser'
import LeftHand from './leftHand'
import RightHand from './rightHand'
import Projectile from './projectile'
import Berry from './berry'
import LRPlayer from './LRPlayer'

// Alternate control schemes
// import KeyPlayer from './keyPlayer'
// import MousePlayer from './mousePlayer'

const sceneSizes = {
  width: 900,
  height: 700
}

const speedGravity = 300;

const gameStartDiv = document.querySelector("#gameStartDiv");
const gameStartBtn = document.querySelector("#gameStartBtn");
const gameEndDiv = document.querySelector("#gameEndDiv");
const gameEndScoreSpan = document.querySelector("#gameEndScoreSpan");


class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
    this.textScore;
  }

  preload() {
    const assets = [
      { key: "bg", path: "assets/background.png" },
      { key: "player", path: "assets/player.png" },
      { key: "ahh", path: "assets/ahh.png" },
      { key: "paperBall", path: "assets/paperBall.png" },
      { key: "handL", path: "assets/handL.png" },
      { key: "handR", path: "assets/handR.png" },
      { key: "closedHandL", path: "assets/closedHandL.png" },
      { key: "closedHandR", path: "assets/closedHandR.png" },
      { key: "berry", path: "assets/berry.png" }
    ];

    assets.forEach(asset => {
      this.load.image(asset.key, asset.path);
    });
  }

  create() {
    this.scene.pause("scene-game");
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.handL = new LeftHand(this, 0, 0, "handL");
    this.handR = new RightHand(this, 0, sceneSizes.height, "handR");
    this.berry = new Berry(this, sceneSizes.width/2, sceneSizes.height/2, "berry");
    this.player = new LRPlayer(this, sceneSizes.width/2, sceneSizes.height-100);
    this.ball = new Projectile(this, 0, sceneSizes.height/4, "paperBall");


    this.leftWall = this.physics.add.body(-1,0,1,sceneSizes.height).setImmovable(true);
    this.rightWall = this.physics.add.body(sceneSizes.width,0,1,sceneSizes.height).setImmovable(true);
    this.leftWall.allowGravity = false;
    this.rightWall.allowGravity = false;
    const colliders = [
      { obj1: this.ball, obj2: this.leftWall },
      { obj1: this.ball, obj2: this.rightWall },
      { obj1: this.player, obj2: this.ball, callback: this.handlePlayerBallCollision }
    ];
    const overlaps = [
      { obj1: this.handL, obj2: this.ball, callback: this.handleBallHandCollision },
      { obj1: this.handR, obj2: this.ball, callback: this.handleBallHandCollision },
      { obj1: this.player, obj2: this.handL, callback: this.handlePlayerHandCollision },
      { obj1: this.player, obj2: this.handR, callback: this.handlePlayerHandCollision },
      { obj1: this.player, obj2: this.berry, callback: this.handlePlayerBerryCollision }
    ];

    colliders.forEach(collider => {
      this.physics.add.collider(collider.obj1, collider.obj2, collider.callback, null, this);
    });
    overlaps.forEach(overlap => {
      this.physics.add.overlap(overlap.obj1, overlap.obj2, overlap.callback, null, this);
    });

    this.textScore = this.add.text(10, 10, "Score: 0", {
      fontSize: "32px",
      fill: "#000"
    });
  }

  handlePlayerBerryCollision(p, b) {
    b.respawn();
    p.addScore();
    this.textScore.setText("Score: " + p.score);
  }

  handlePlayerBallCollision(p, b) {
    b.setGrabbable();
  }

  handleBallHandCollision(h, b) {
    if (b.isGrabbable()) {
      if (!h.holdingTrash) {
        h.holdTrash();
        b.respawn();
      } else if (!h.holdingTrash) {
        h.holdTrash();
        b.respawn();
      }
    }
  }

  handlePlayerHandCollision(p, h) {
    if (!h.holdingTrash) {
      p.setDead();
      this.gameOver();
    }
  }

  update() {
    this.player.update();
    this.ball.update();
    this.handL.update();
    this.handR.update();
    this.berry.update();
  }

  gameOver() {
    this.sys.game.destroy(true);
    gameEndDiv.style.display = "flex";
    gameEndScoreSpan.innerText = this.player.score;
  }

}

const config = {
  type: Phaser.WEBGL,
  width: sceneSizes.width,
  height: sceneSizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: speedGravity
      },
      debug: false
    }
  },
  scene: [GameScene]
}

const game = new Phaser.Game(config);

gameStartBtn.addEventListener("click", () => {
  gameStartDiv.style.display = "none";
  game.scene.resume("scene-game");
});

