export default class Berry extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);


        scene.physics.world.enable(this);
        scene.add.existing(this).setOrigin(0, 0);
        this.scene = scene;
        this.setScale(0.06);
        this.setCircle(this.width/2.5);
        this.setOffset(this.width/10, 0);
        
        this.body.allowGravity = false;

        this.startY = y;
        this.amplitude = 10;
        this.frequency = 0.005;
    }

    respawn() {
        this.body.x = Math.random() * (this.scene.game.config.width - this.body.width);
        this.startY = Math.random() * (this.scene.game.config.height - this.body.height - this.scene.game.config.height/4) + this.scene.game.config.height/4;
    }

    update() {
        this.body.y = this.startY + (this.amplitude * Math.sin(this.frequency * this.scene.time.now));
    }
}