import Player from './Player.js';
import Stars from './Stars.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
var platforms;
var stars;
var score = 0;
var scoreText;

// COL·LISIONS
function collectStar (player, star)
{
    // Desactiva l'arcadeSprite
    star.disableBody(true, true);

    // Actualitzar l'score
    score += 10;
    scoreText.setText('Score: ' + score);
}

// MÈTODES DE CONTROL DE FLUX
// Es carreguen recursos externs (imatges, sons, etc.)
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

// Inicialitza els elements de joc
function create ()
{
    // 1. AFEGIM ELEMENTS A L'ESCENA

    // Afegim imatges
    this.add.image(400, 300, 'sky');

    // Afegim plataformes
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Afegim jugador
    player = new Player(this, 100, 450);

    // Afegim textos
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Afegim estrelles
    stars = new Stars(this);

    // 2. DEFINIM COL·LISIONS (amb els arcadePhysics!)
    // Col·lisions entre elements
    this.physics.add.collider(stars.physicSpritesGroup, platforms);
    
    // Col·lisions amb el Player
    this.physics.add.collider(player.physicsSprite, platforms);
    this.physics.add.overlap(player.physicsSprite, stars.physicSpritesGroup, collectStar, null, this);
    
}

// Lògica de joc. S'executa a cada frame
function update()
{
    player.update();
    stars.update();
    // bombs.update();
}