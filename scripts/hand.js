export default class Hand extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, isLeftHand) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this).setOrigin(0, 0);
        this.scene = scene;
        this.setScale(0.25);
        this.setSize(this.width / 1.02, this.height / 2);
        
        // Mirroring adjustments
        if (isLeftHand) {
            this.setOffset(this.width / 1.02 - this.width, this.height / 3);
        } else {
            this.setOffset(2 * (this.width - this.width/1.02), this.height/3);
        }

        this.body.allowGravity = false;
        this.body.setVelocityY(100 * (Math.random() * 2.5 + 1.5));

        this.startX = x;
        this.amplitude = 80;
        this.frequency = 0.004;
        this.holdingTrash = false;
        this.isLeftHand = isLeftHand;
    }

    holdTrash() {
        this.holdingTrash = true;
        this.setTexture(this.isLeftHand ? "closedHandL" : "closedHandR");
        this.setAlpha(0.2);
    }

    dropTrash() {
        this.holdingTrash = false;
        this.setTexture(this.isLeftHand ? "handL" : "handR");
        this.setAlpha(1);
    }

    update() {
        if (this.body.y > this.scene.game.config.height + this.body.height * 4) {
            this.body.y = -this.body.height;
            this.body.setVelocityY(100 * (Math.random() * 2.5 + 1.5));
            this.dropTrash();
        }
        if (this.isLeftHand) {
            this.body.x = this.startX + (this.amplitude * Math.sin(this.frequency * this.scene.time.now)) - this.body.width/2;
        } else {
            this.body.x = this.startX + (this.amplitude * Math.sin(this.frequency * this.scene.time.now)) + (this.scene.game.config.width - this.body.width/2);
        }
    }
}