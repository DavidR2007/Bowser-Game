export default class Bombs {
    constructor(scene) {
        this.scene = scene;
        this.speedMultiplier = 1; // Para power-up slow
        this.active = true;       // Controla si las bombas deben funcionar
        this.create();
    }

    spawnBomb() {
        if (!this.active) return; // evita spawns cuando el player muere o el juego está pausado

        // Intentar obtener una bomba muerta
        let newBomb = this.physicSpritesGroup.getFirstDead();

        // Si no hay bombas muertas, crear una nueva
        if (!newBomb) {
            newBomb = this.physicSpritesGroup.create(
                Phaser.Math.Between(20, 780),
                -20,
                'bomb'
            );
        } else {
            // Reactivar bomba existente
            newBomb.enableBody(
                true,
                Phaser.Math.Between(20, 780),
                -20,
                true,
                true
            );
        }

        // Velocidad afectada por power-ups
        newBomb.setVelocity(0, 100 * this.speedMultiplier);
    }

    create() {
        // Crear grupo de bombas
        this.physicSpritesGroup = this.scene.physics.add.group({
            key: 'bomb',
            repeat: 59,
            setXY: { x: 0, y: 0 }
        });

        // Desactivar todas al inicio
        this.physicSpritesGroup.children.iterate(bomb => {
            bomb.disableBody(true, true);
        });

        // Spawner automático
        this.spawnEvent = this.scene.time.addEvent({
            delay: 150,
            callback: this.spawnBomb,
            callbackScope: this,
            loop: true
        });
    }

    stop() {
        // Detener completamente el sistema de bombas
        this.active = false;

        // Desactivar físicas de todas las bombas
        this.physicSpritesGroup.children.iterate(bomb => {
            if (bomb.body) bomb.body.enable = false;
        });

        // Detener el evento de spawn
        if (this.spawnEvent) {
            this.spawnEvent.paused = true;
        }
    }

    update() {
        if (!this.active) return; // evita crashes

        // Reciclar bombas que salen de pantalla
        this.physicSpritesGroup.children.iterate(bomb => {
            if (bomb.y > 600) {
                bomb.disableBody(true, true);
            }
        });
    }
}
