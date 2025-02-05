export default class MousePlayer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.dead = false;
 
    this.speed = 500;
    this.accel = 3000;
    this.friction = 5;
    this.deadzone = 100;
    
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCircle(this.width/2.5);
    this.setOffset(this.width/10, 0);
    this.setScale(0.2);

    this.setCollideWorldBounds(true);
    // this.setImmovable(true);
    this.body.allowGravity = false;
    this.body.setDrag(0.0005);
    this.body.setDamping(true);
    this.body.setBounce(3);

    this.scene = scene;
  }

  setDead() {
    this.dead = true;
  }

  update() {
    let angle = Phaser.Math.Angle.Between(this.body.center.x, this.body.center.y, this.scene.input.x, this.scene.input.y);
    let dist = Phaser.Math.Distance.Between(this.body.center.x, this.body.center.y, this.scene.input.x, this.scene.input.y);

    if (this.scene.input.activePointer.isDown) {
      this.setTexture('ahh');
      this.body.velocity.limit(this.speed * 2);
    } else {
      this.body.velocity.limit(this.speed);
      this.setTexture('player');
    }

    if (dist > this.deadzone) {
      this.body.acceleration.x = Math.cos(angle) * this.accel;
      this.body.acceleration.y = Math.sin(angle) * this.accel;
    } else {
      this.body.setAcceleration(0);
    }

    if (this.dead) {
      this.setTexture('ahh');
    }
  }
}