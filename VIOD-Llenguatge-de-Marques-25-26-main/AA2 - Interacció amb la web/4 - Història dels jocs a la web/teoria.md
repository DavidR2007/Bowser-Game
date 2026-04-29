# 1. Evolució històrica dels videojocs a la web
## 1.1 Limitacions prèvies a HTML5

HTML5 (2014) va suposar grans canvis a la web. Entre elles, la possibilitat de dibuixar gràfics amb l'element `<canvas>` i la possibilitat d'emmagatzemar dades locals amb LocalStorage. Abans, la interacció amb l'usuari es feia amb HTML + CSS + JavaScript simple i amb pluguins que permetien executar eines del sistema operatiu des del navegador. 

## 1.2 Videojocs web basats en servidor

Abans que el navegador pogués dibuixar gràfics, els jocs web es basaven en informació donava per text,  imatges estàtiques i formularis.

Alguns dels jocs destacables van ser:

[![Ikariam gameplay](https://img.youtube.com/vi/6cm7BvcaY7o/0.jpg)](https://www.youtube.com/watch?v=6cm7BvcaY7o)

_Ikariam (Gameforge, 2008)_

[![Comunio gameplay](https://img.youtube.com/vi/_SZuIQH5SE4/0.jpg)](https://youtu.be/_SZuIQH5SE4)

_Comunio (Fabian Loschek, 2000)_

Molts d'aquests jocs eren RPGs en format text o jocs online per torns. 

## 1.3 Videojocs basats en plugins: Flash i Java Applets

Per altra banda, els navegadors permetien incrustar plugins externs mitjançant elements com `<object>` i `<embed>`.
Aquests plugins eren programes instal·lats a l’ordinador de l’usuari (com el reproductor Flash Player o la Java Virtual Machine) que el navegador carregava i executava dins de la pàgina web.

Entre altres, aquests plugins permetien dibuixar gràfics 2D i 3D al navegador i executar aplicacions interactives complexes.

_Curiositat, com es feien els videojocs amb Adobe Flash Player: https://youtu.be/NTuhk8j3A-o?list=PLD17B0A2D547A9E5D_

Alguns dels jocs destacables van ser:

[![Samorost gameplay](https://img.youtube.com/vi/kRV9yUKbKuM/0.jpg)](https://youtu.be/kRV9yUKbKuM)

_Samorost (Amanita Design, 2003)_

[![The Binding of Isaac gameplay](https://img.youtube.com/vi/oU8EEHy9vR0/0.jpg)](https://youtu.be/oU8EEHy9vR0)

_The Binding of Isaac (Edmund McMillen & Florian Himsl, 2011)_

[![Meat Boy gameplay](https://img.youtube.com/vi/Dhz_YjR1Ve0/0.jpg)](https://youtu.be/Dhz_YjR1Ve0)

_Meat Boy (Team Meat, 2010)_

[![Minecraft Beta](https://i.imgur.com/LU4nt.jpeg)](https://imgur.com/LU4nt)

_Minecraft Beta (Mojang, 2009)_

# 2. HTML5 i la nova era
Amb el pas del temps, els plugins com Flash Player o Java Applets van començar a mostrar vulnerabilitats greus, problemes de rendiment i incompatibilitat amb dispositius mòbils. La web necessitava una alternativa moderna, segura i nativa.

A partir del 2010 els navegadors van començar a implementar progressivament les noves funcionalitats d’HTML5, i el 2014 l’estàndard es va publicar oficialment. Aquest conjunt de noves llibreries i APIs va permetre substituir completament els antics plugins.

Algunes de les novetats més importants van ser:
- **Canvas2D.** Va permetre dibuixar gràfics, animacions i sprites directament al navegador.
- **WebGL.** Va permetre gràfics 3D accelerats per GPU, comparable a OpenGL.
- **WebAudio API.** Va permetre gestionar so, música, efectes i mescles d’àudio.
- **LocalStorage.** Va permetre guardar partides, configuracions i dades de joc de manera persistent.
- **APIs d’entrada.** Va permetre el suport per a teclat, ratolí, pantalla tàctil i gamepads.

Totes aquestes llibreries van fer possible crear interactius amb el navegador de forma nativa, sense la necessitat de recórrer a Flash o Java applets.