# Phaser.js

_Nous jocs fets amb Phaser.js: https://phaser.io/games_

## 1. Llibreria vs. framework
Amb l’arribada d’HTML5, els desenvolupadors web van començar a crear llibreries i frameworks per facilitar la creació de videojocs web. Programar directament amb Canvas o WebGL era complex (encara ho és).

Phaser (2013) és un d’aquests frameworks que facilita el desenvolupament de videojocs HTML5.

| Framework      | Llibreria |
| ----------- | ----------- |
| És una estructua completa. Defineix la metodolgia que s'ha de seguir. | Agrupa eines i funcions per a utilitzar amb total flexibilitat. |
| Controla el flux del programa. | El desenvolupador és responsable del flux del codi. |
| Hi ha una metodologia definida. | Flexibilitat completa per usar les funcions que ofereix la llibreria. |

_Framework vs. llibreria (Brandon Wozniewicz, 2019): https://www.freecodecamp.org/news/the-difference-between-a-framework-and-a-library-bd133054023f/_

Amb Phaser.js es poden desenvolupar la majoria d’interactius i videojocs 2D que abans es feien amb Flash, però utilitzant tecnologia moderna i nativa del navegador.

_Pàgina web oficial: https://phaser.io/_

## 2. Preparació d'entorn i configuració inicial

_Documentació oficial - guia d'entrada a Phaser.js: https://phaser.io/learn_

Per començar a utilitzar Phaser, necessitem:
- Iniciar un servidor local.
- Carregar les llibreries phaser.js.
- Definir la configuració inicial del projecte. 

### 2.1 Inicial un servidor local
Phaser necessita poder carregar recursos propis (imatges, àudios, etc.) per a construir cada projecte. Si ho carreguessim tot amb fitxers estàtics, per exemple `file://C:/Users/eric/recursos/imatges-phaser/`, hauriem de donar la llibertat al navegador de poder accedir a qualsevol indret del nostre ordinador. 

Exposar el nostres fitxers a la web és molt perillòs. La manera adequada és crear un entorn tancat i controlat, amb un servidor, per exemple `http://127.0.0.1:5500/recursos/imatges-phaser`.

> [!NOTE]
> A Visual Studio Code trobem l'extensió Live Server (Ritwick Dey) que permet obrir un servidor local a la carpeta del projecte. 
> A linux podem iniciar un servidor amb la comanda python instal·lada: python -m SimpleHTTPServer 8080

### 2.2 Carregar les llibreries phaser.js

Podem carregar Phaser remotament des d’un servidor web. 

```html
<!-- Pas únic: Càrrega remota -->
<script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
```

També podem carregar Phaser localment baixant-lo des de la seva pàgina oficial. phaser.js és la versió llegible, mentre que phaser.min.js és la versió minificada i més lleugera.

```html
<!-- Pas 1: Baixada de l'última versió disponible (https://phaser.io/download/stable) -->
<!-- Pas 2: Càrrega local -->
<script src="./phaser.min.js"></script>
```

### 2.3 Configuració inicial del projecte i cicle de vida

A la part javascript del nostre projecte web, hem de definir aquests 4 elements:
- **var config.** Objecte de configuració. Defineix la configuració del projecte. 
- **preload().** S’executa abans de començar el joc. Carrega recursos en memòria (imatges, sons, spritesheets, …). 
- **create().** Inicialitza el joc. Pot carregar en escena els fitxers que s'han carregat en memòria.
- **update().** Loop principal. S’executa a cada frame (60 FPS).

```js
var config = {
    type: Phaser.AUTO,     // Phaser tria automàticament el context de renderitzat (més info. a l'enllaç de la documentació)
    width: 800,            // Amplada de la pantalla del joc
    height: 600,           // Alçada de la pantalla del joc
    scene: {
        preload: preload,  // Funció que carrega recursos
        create: create,    // Funció que inicialitza el joc
        update: update     // Funció que s'executa cada frame
    }
};

// Creem el joc amb la configuració definida
var game = new Phaser.Game(config);

function preload ()
{
    // Es carreguen recursos externs (imatges, sons, etc.)
}

function create ()
{
    // Inicialitza els elements de joc

    // *Exemple: afegir textos, sprites, sons, etc.
    //      Aquestes instruccions també poden estar a l'update(),
    //      la diferència és que create() és el frame 0 que prepara
    //      l'entorn de joc, mentre que l'upate() és el bucle principal de joc
    //      que s'executa a cada frame.
}

function update ()
{
    // Lògica de joc. S'executa a cada frame
}

```

_Documentació - Tutorial guiat: https://phaser.io/tutorials/making-your-first-phaser-3-game/part1_

_Objecte info: https://phaser.io/tutorials/making-your-first-phaser-3-game/part1_

_Funció preload() i create(): https://phaser.io/tutorials/making-your-first-phaser-3-game/part2_

_Funció update(): https://phaser.io/tutorials/making-your-first-phaser-3-game/part7_
