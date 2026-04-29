import Player from './Player.js';
import Bombs from './Bombs.js';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);

var player;
var bombs;
var playerName;

function preload ()
{
    this.load.audio('hitSound', 'assets/AUDIO/HITSOUND.wav');

    this.load.image('background', 'assets/background.png');
    this.load.image('bomb', 'assets/fireball.png');

    this.load.image('heart_full', 'assets/full.heart.png');
    this.load.image('heart_empty', 'assets/empty.heart.png');

    this.load.image('power_heart', 'assets/full.heart.png');
    this.load.image('power_shield', 'assets/power_shield.png');
    this.load.image('power_slow', 'assets/power_slow.png');

    this.load.spritesheet('dude', 
        'assets/bombPlayer.png',
        { frameWidth: 19, frameHeight: 25 }
    );
}

function create ()
{
    // -----------------------------------
    // PEDIR NOMBRE DEL JUGADOR
    // -----------------------------------
    playerName = prompt("Introduce tu nombre:");
    if (!playerName || playerName.trim() === "") playerName = "Jugador";

    // Fondo
    const backgroundImg = this.add.image(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'background');
    backgroundImg.displayWidth = CANVAS_WIDTH;
    backgroundImg.displayHeight = CANVAS_HEIGHT;

    this.input.setDefaultCursor('none');

    // AUDIO
    this.hitSound = this.sound.add('hitSound', { volume: 0.5 });

    // -------------------------------
    // SISTEMA DE PUNTUACIÓN
    // -------------------------------
    this.score = 0;
    this.highscore = parseInt(localStorage.getItem("highscore")) || 0;
    this.highscoreName = localStorage.getItem("highscoreName") || "Nadie";

    this.scoreText = this.add.text(20, 10, "Score: 0", {
        fontSize: "28px",
        fontFamily: "Arial",
        color: "#ffffff"
    });

    this.highscoreText = this.add.text(20, 40, "Record: " + this.highscoreName + " - " + this.highscore, {
        fontSize: "20px",
        fontFamily: "Arial",
        color: "#ffcc00"
    });

    this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
            if (!this.isPaused && !player?.isDead) {
                this.score += 10;
                this.scoreText.setText("Score: " + this.score);
            }
        }
    });

    // HUD
    this.hearts = [];
    for (let i = 0; i < 3; i++) {
        const heart = this.add.image(30 + i * 40, 80, 'heart_full');
        heart.setScale(2);
        this.hearts.push(heart);
    }

    this.updateHearts = (lives) => {
        for (let i = 0; i < 3; i++) {
            this.hearts[i].setTexture(i < lives ? 'heart_full' : 'heart_empty');
        }
    };

    // -------------------------------
    // TEXTURA DE ESTELA
    // -------------------------------
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff, 1);
    g.fillCircle(4, 4, 4);
    g.generateTexture('trailParticle', 8, 8);
    g.destroy();

    // -------------------------------
    // ESTELA (DEBAJO DEL PLAYER)
    // -------------------------------
    this.trailParticles = this.add.particles('trailParticle');
    this.trail = this.trailParticles.createEmitter({
        speed: 0,
        scale: { start: 0.8, end: 0 },
        alpha: { start: 0.5, end: 0 },
        lifespan: 300,
        frequency: 25
    });

    // -------------------------------
    // PLAYER (ENCIMA DE LA ESTELA)
    // -------------------------------
    player = new Player(this, 100, 450, 3, playerName);
    this.trail.startFollow(player.physicsSprite);

    // Bombas y powerups
    bombs = new Bombs(this);
    this.powerUps = this.physics.add.group();

    // Colisión con bombas
    this.physics.add.overlap(
        player.physicsSprite,
        bombs.physicSpritesGroup,
        hitBomb,
        null,
        this
    );

    function hitBomb(playerSprite, bomb) {
        player.serGolpeado();
        bomb.disableBody(true, true);
    }

    // Power-ups
    this.spawnPowerUp = () => {
        const types = ['heart', 'shield', 'slow'];
        const type = Phaser.Utils.Array.GetRandom(types);

        const spriteKey = {
            heart: 'power_heart',
            shield: 'power_shield',
            slow: 'power_slow'
        }[type];

        const x = Phaser.Math.Between(50, CANVAS_WIDTH - 50);
        const y = Phaser.Math.Between(50, CANVAS_HEIGHT - 50);

        const power = this.powerUps.create(x, y, spriteKey);
        power.type = type;
        power.setScale(1.5);
    };

    this.time.addEvent({
        delay: 5000,
        callback: () => this.spawnPowerUp(),
        loop: true
    });

    this.physics.add.overlap(
        player.physicsSprite,
        this.powerUps,
        collectPowerUp,
        null,
        this
    );

    function collectPowerUp(playerSprite, power) {

        this.score += 50;
        this.scoreText.setText("Score: " + this.score);

        if (power.type === 'heart' && player.lives < 3) {
            player.lives++;
            this.updateHearts(player.lives);
        }

        if (power.type === 'shield') {
            player.invulnerable = true;
            player.physicsSprite.setTint(0x00ffff);

            this.time.delayedCall(3000, () => {
                player.invulnerable = false;
                player.physicsSprite.clearTint();
            });
        }

        if (power.type === 'slow') {
            bombs.speedMultiplier = 0.5;
            this.time.delayedCall(3000, () => bombs.speedMultiplier = 1);
        }

        power.destroy();
    }

    // GAME OVER
    this.gameOver = () => {

        // Guardar récord SOLO si es mayor
        if (this.score > this.highscore) {
            localStorage.setItem("highscore", this.score);
            localStorage.setItem("highscoreName", playerName);
        }

        const bestName = localStorage.getItem("highscoreName") || "Nadie";
        const bestScore = localStorage.getItem("highscore") || 0;

        this.add.text(
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2,
            `GAME OVER\n${playerName}: ${this.score}\nRecord: ${bestName} - ${bestScore}`,
            {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#ff0000",
                align: "center"
            }
        ).setOrigin(0.5);

        this.physics.world.pause();
        bombs.speedMultiplier = 0;

        this.time.delayedCall(8000, () => this.scene.restart());
    };

    // DIFICULTAD GRADUAL
    this.time.addEvent({
        delay: 10000,
        loop: true,
        callback: () => {
            bombs.speedMultiplier = Math.min(bombs.speedMultiplier + 0.1, 3);
        }
    });

    // PAUSA / DESPAUSA
    this.isPaused = false;

    this.input.on('pointerdown', (pointer) => {

        if (pointer.leftButtonDown()) {

            if (!this.isPaused) {
                this.physics.world.pause();
                this.time.paused = true;
                this.isPaused = true;

            } else {
                this.physics.world.resume();
                this.time.paused = false;
                this.isPaused = false;

                const p = this.input.activePointer;
                player.physicsSprite.x = p.x;
                player.physicsSprite.y = p.y;
            }
        }
    });
}

function update()
{
    if (player.isDead) return;
    if (this.isPaused) return;

    bombs.update();
}
