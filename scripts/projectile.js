export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.grabbable = false;

        scene.physics.world.enable(this);
        scene.add.existing(this).setOrigin(0, 0);
        this.scene = scene;
        this.setScale(0.08);
        this.body.setCircle(this.width/2);
        
        this.body.setBounce(1.5);
        this.body.allowGravity = true;
        this.body.setVelocity(Math.random() * 400 + 200, -200);
    }

    setGrabbable() {
        this.grabbable = true;
    }

    isGrabbable() {
        return this.grabbable;
    }

    respawn() {
        this.grabbable = false;

        const left = Math.random() > 0.5 ? false : true;
        this.body.x = left ? 0 : this.scene.game.config.width - this.body.width;
        this.body.y = Math.random() * (this.scene.game.config.height - this.scene.game.config.height/4);

        if (left) {
            this.body.setVelocity(Math.random() * 400 + 200, -200);
        } else {
            this.body.setVelocity(-(Math.random() * 400 + 200), -200);
        }
    }

    update() {
        this.body.velocity.limit(600);

        if (this.body.y > this.scene.game.config.height || this.body.x > this.scene.game.config.width || this.body.x < 0 || this.body.y < -300) {
            this.respawn();
        }
    }
}