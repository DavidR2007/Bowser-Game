export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        this.horizontalSpeed = 160;
        this.verticalSpeed = 330;

        this.create(x, y);
    }

    create(x, y) {
        // 1. Configuració de físiques
        this.physicsSprite = this.scene.physics.add.sprite(x,y, 'dude');
        this.physicsSprite.setBounce(0.2);
        this.physicsSprite.setCollideWorldBounds(true);

        // 2. Configuració de moviment
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // 3. Configuració de la interacció de l'usuari
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.physicsSprite.setVelocityX(-1 * this.horizontalSpeed);
            this.physicsSprite.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.physicsSprite.setVelocityX(this.horizontalSpeed);
            this.physicsSprite.anims.play('right', true);
        }
        else
        {
            this.physicsSprite.setVelocityX(0);
            this.physicsSprite.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.physicsSprite.body.touching.down)
        {
            this.physicsSprite.setVelocityY(-1 * this.verticalSpeed);
        }
    }
}