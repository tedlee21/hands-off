export default class LRPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'player');
      this.dead = false;
      this.score = 0;
    
      this.speed = 450;
      
      scene.physics.world.enable(this);
      scene.add.existing(this);
      this.setCircle(this.width/2.5);
      this.setOffset(this.width/10, 0);
      this.setScale(0.2);
  
      this.setCollideWorldBounds(true);
      this.body.allowGravity = true;
      this.body.setGravityY(1200);
      this.body.setBounce(3);
  
      const {SHIFT, ENTER, LEFT, RIGHT} = Phaser.Input.Keyboard.KeyCodes;
      this.keyMap = scene.input.keyboard.addKeys({
        shift: SHIFT,
        enter: ENTER,
        left: LEFT, 
        right: RIGHT
      })
    }

    addScore() {
      this.score += 1;
    }
  
    setDead() {
      this.dead = true;
    }
  
    update() {
      const {shift, enter, left, right} = this.keyMap;
  
      if (left.isDown || shift.isDown) {
        this.body.setVelocity(-this.speed, -650);
      } else if (right.isDown || enter.isDown) {
        this.body.setVelocity(this.speed, -650);
      }
  
      this.body.velocity.limit(this.speed);

      if (this.dead) {
        this.setTexture('ahh');
      }
    }
  }