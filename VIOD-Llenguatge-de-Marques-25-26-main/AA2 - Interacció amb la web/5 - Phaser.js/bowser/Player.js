export default class Player {
    constructor(scene, x, y, vidas = 3, nombre = "Jugador") {
        this.scene = scene;
        this.lives = vidas;          // Vidas
        this.invulnerable = false;   // Invulnerabilidad temporal
        this.isDead = false;         // Estado de muerte
        this.nombre = nombre;        // Nombre del jugador
        this.create(x, y);
    }

    create(x, y) {
        // Sprite del jugador
        this.physicsSprite = this.scene.physics.add.sprite(x, y, 'dude');

        // Animación idle
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.physicsSprite.anims.play('idle');

        // Movimiento siguiendo el cursor SOLO si no está muerto ni pausado
        this.scene.input.on('pointermove', (pointer) => {
            if (this.isDead) return;
            if (this.scene.isPaused) return;

            this.physicsSprite.x = pointer.x;
            this.physicsSprite.y = pointer.y;
        });
    }

    // Recibir daño
    serGolpeado() {
        if (this.invulnerable || this.isDead) return;

        this.lives--;
        this.scene.updateHearts(this.lives);

        // SONIDO DE DAÑO
        if (this.scene.hitSound) {
            this.scene.hitSound.play();
        }

        // EFECTO DE SACUDIDA DE PANTALLA
        this.scene.cameras.main.shake(200, 0.01);

        // Si no quedan vidas - muerte
        if (this.lives <= 0) {
            this.die();
            return;
        }

        // Activar invulnerabilidad temporal
        this.activarInvulnerabilidad();
    }

    // Invulnerabilidad temporal
    activarInvulnerabilidad() {
        this.invulnerable = true;

        // Parpadeo
        this.scene.tweens.add({
            targets: this.physicsSprite,
            alpha: 0.2,
            yoyo: true,
            repeat: 5,
            duration: 100
        });

        // Quitar invulnerabilidad
        this.scene.time.delayedCall(1000, () => {
            this.invulnerable = false;
            this.physicsSprite.alpha = 1;
        });
    }

    // Muerte total
    die() {
        this.isDead = true;
        this.physicsSprite.setTint(0xff0000);
        this.physicsSprite.body.enable = false;

        // Pasamos el nombre del jugador al gameOver
        this.scene.gameOver(this.nombre);
    }

    update() {}
}
