### Documentació Phaser
https://docs.phaser.io/

### Sandbox
https://phaser.io/sandbox

### Exemples
https://phaser.io/examples/v3.85.0

### PhaserByExample-v2
https://phaser.io/news/2024/04/phaser-by-example-book

# Exercici 1 - HolaMón
Crea un fitxer index.html amb un element &lt;head&gt; per importar l'script de phaser i un element &lt;body&gt; amb el codi bàsic de phaser.js per mostrar un missatge "Hola Món". Escriu el codi de JavaScript al final del &lt;body&gt; dins d'un element &lt;script&gt;.

Pistes: 
- Necessitaràs el codi JavaScript vist a l'apartat _2.3 Configuració inicial del projecte i cicle de vida_
- La documentació mostra com afegir l'objecte text. Fixa't que a l'exemple hi ha comentat un estil personalitzat (lletra 'Arial', mida de lletra 64 i color '#00ff00'). Phaser utilitza el "Default Style" + l'especificació pròpia de l'usuari.
- La creació d'elements nous al canvas de joc es defineix al create().

Documentació: https://docs.phaser.io/phaser/concepts/gameobjects/text

# Exercici 2 - Primer joc a Phaser
Segueix el tutorial oficial "Making your first Phaser game" i crea un petit videojoc funcional. Assegura't que funcionin les següents característiques del joc:

- el jugador es pot moure i saltar
- hi ha un món amb plataformes estàtiques
- es poden col·leccionar estrelles
- es mostra un marcador de puntuació
- apareix una bomba quan no queden estrelles
- si es col·lisiona amb una bomba, s'acaba la partida

Nota: L'objectiu de l'exercici és entendre el el cicle de vida de Phaser (preload, create, update) i familiaritzar-se en la creació de nous elements.

Tutorial "Making your first Phaser game": https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game

# Exercici 3 - Arquitectura modular amb Phaser
Reorganitza el codi de l'exercici 2 per a que el projecte sigui fàcil de mantenir. Crea un script per a cada element de joc i distribueix la lògica del main.js entre els diversos fitxers. Cada fitxer correspon a un element diferent i només es responsable de la seva informació i gestió.
- Afegeix l'atribut type="module" a l'element script de l'index.html.
- Crea un fitxer Player.js que contingui la classe del jugador (moviment, animacions, etc.).
- Crea un fitxer StarGroup.js per gestionar les estrelles del joc.
- Utilitza main.js com a punt d’entrada del joc, amb la configuració (config) i la creació de l’escena.
- Defineix els elements de joc com a atributs de l'escena i gestiona la creació d'objectes i les seves col·lisions des del create().
- Importa les classes amb import i utilitza-les dins de create() i update().

# Exercici 4 - TODO (afegir vides al tutorial)

# Exercici 5 - Bowser
Desenvolupa una versió bàsica del minijoc _Danger Bob-omb Danger!_ (New Super Mario Bros., DS).
[![Bowser gameplay](https://img.youtube.com/vi/-zx0z5XUPcg/0.jpg)](https://youtu.be/-zx0z5XUPcg)

- (Player.js) S'ha de poder desplaçar amb el ratolí.
- (Bombs.js) En un inici, estan totes desactivades. Cada 150 ms, s'obté una de les desactivades, s'activa i apareix a la pantalla fins que surt fora dels marges de la pantalla i es desactiva. N'hi ha màxim 30.

- A l'inici del joc, el jugador té 3 vides. Si el jugador arriba a 0, es mostra un text amb You Lose.
- Si el jugador sobreviu 10 segons, es mostra un text amb You Win.

- La col·lisió entre el jugador i una bomba resta 1 vida.

- Utilitza les funcions disableBody(), enableBody(), getFirstDead() per a reciclar les bombes.

## Funcions per a Bombs.js

Obtenir el primer objecte del grup que està desactivat:
https://docs.phaser.io/api-documentation/class/gameobjects-group#getfirstdead
```js
// Dead: no és visible i no té el sistema de físiques activat
this.physicSpritesGroup.getFirstDead();
```

Activar un objecte:
https://docs.phaser.io/api-documentation/namespace/physics-arcade-components-enable#enablebody
```js
// Reseteja els valors de bomb,
// el posiciona a x,y
// el fa visible i li activa les físiques
bomb.enableBody(true, x, y, true, true);
```

Assignar una velocitat a un objecte:
https://docs.phaser.io/api-documentation/namespace/physics-arcade-components-velocity#setvelocity
```js
// Assigna la velocitat (velX, velY) a bomb
bomb.setVelocity(velX, velY);
```

Desactivar un objecte:
https://docs.phaser.io/api-documentation/namespace/physics-arcade-components-enable#disablebody
```js
// Desactiva la visibilitat i les físiques de bomb
bomb.disableBody(true, true);
```

Defineix un esdeveniment cada 'x' ms:
https://docs.phaser.io/phaser/concepts/time#start-timer
```js
// Executa this.spawnBomb() cada 150 ms
this.scene.time.addEvent({
    delay: 150,
    callback: this.spawnBomb,
    callbackScope: this,
    loop: true
});
```

## Funcions per a Player.js

Sistema d'arrossegament
```js
// Defineix que el jugador es pot arrossegar amb el ratoli
// useHandCursor canvia el cursor del ratolí
this.physicsSprite.setInteractive({ useHandCursor: true });
// Habilita el sistema de drag a physicsSprite
this.scene.input.setDraggable(this.physicsSprite);
```

Iniciar i acabar arrossegament
```js
// https://docs.phaser.io/api-documentation/event/input-events#drag_start
// Atrapa el moment on comença l'arrossegament
this.scene.input.on('dragstart', (pointer, gameObject) => {

});

// https://docs.phaser.io/api-documentation/event/input-events#drag
// Atrapa els frames mentre s'arrossega qualsevol gameObject
this.scene.input.on('drag', 
    (pointer, gameObject, dragX, dragY) => {
        // Assigna posició del ratolí a la nova posició de l'sprite
        this.physicsSprite.x = dragX;
        this.physicsSprite.y = dragY;
    }
);

// https://docs.phaser.io/api-documentation/event/input-events#drag_end
// Atrapa el moment on s'acaba l'arrossegament
this.scene.input.on('dragend', (pointer, gameObject, dropped));
```

Animacions
```js
// Genera l'animació idle a partir de la imatge bombPlayer
this.scene.anims.create({
    key: 'idle',
    frames: this.scene.anims.generateFrameNumbers('bombPlayer', { start: 0, end: 1 }),
    frameRate: 10, // frames per segon
    repeat: -1 // es repeteix infinitament
});

// Reprodueix l'animació 'idle'
this.physicsSprite.anims.play('idle');
```

## Funcions per a main.js
Col·lisions
```js
// Defineix que cada vegada que se sobreposin el physicSprite del player i el grup de bombes, es cridarà la funció hitBomb
this.physics.add.collider(player.physicsSprite, bombs.physicSpritesGroup, hitBomb, null, this);

function hitBomb (player, bomb)
{
    // codi de la col·lisió
}
```
