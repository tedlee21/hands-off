export default class KeyPlayer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.dead = false;
 
    this.speed = 500;
    this.accel = 3000;
    
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCircle(this.width/2.5);
    this.setOffset(this.width/10, 0);
    this.setScale(0.2);

    this.setCollideWorldBounds(true);
    this.body.allowGravity = false;
    this.body.setDrag(0.0005);
    this.body.setDamping(true);
    this.body.setBounce(3);

    const { W, A, S, D, LEFT, RIGHT, UP, DOWN, SHIFT} = Phaser.Input.Keyboard.KeyCodes;
    this.keyMap = scene.input.keyboard.addKeys({
      w: W, 
      a: A, 
      s: S, 
      d: D,
      left: LEFT, 
      right: RIGHT, 
      up: UP,
      down: DOWN,
      shift: SHIFT
    })
  }

  setDead() {
    this.dead = true;
  }

  update() {
    const {w, a, s, d, left, right, up, down, shift} = this.keyMap;

    if (shift.isDown) {
      this.setTexture('ahh');
    } else {
      this.setTexture('player');
    }

    this.body.setAcceleration(0);

    if (left.isDown || a.isDown) {
      this.body.setAccelerationX(-this.accel);
    } else if (right.isDown || d.isDown) {
      this.body.setAccelerationX(this.accel);
    } else {
      this.body.setAccelerationX(0);
    }

    if (up.isDown || w.isDown) {
        this.body.setAccelerationY(-this.accel);
    } else if (down.isDown || s.isDown) {
        this.body.setAccelerationY(this.accel);
    } else {
        this.body.setAccelerationY(0);
    }

    this.body.velocity.limit(this.speed);
    this.body.acceleration.normalize().scale(this.accel);
  }
}