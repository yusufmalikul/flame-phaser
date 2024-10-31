class Example extends Phaser.Scene {
    preload() {
        this.load.image('brush', 'yellow.png'); // Load the brush image
    }

    create() {
        this.hsv = Phaser.Display.Color.HSVColorWheel(); // Create an HSV color wheel
        this.i = 0;

        // Set up the particle emitter
        this.emitter = this.add.particles(0, 0, 'brush', {
            speed: { min: 50, max: 100 }, // Speed of particles
            tint: () => this.hsv[Phaser.Math.Between(0, 359)].color, // Random color from HSV wheel
            lifespan: { min: 600, max: 2200 }, // Lifespan of particles
            angle: { min: -90, max: 90 }, // Adjusted angle for lateral movement
            scale: { start: 2.5, end: 0 }, // Size of particles (5x bigger than original)
            gravityY: 0, // Negative gravity to make particles rise slightly
            frequency: 100, // Frequency of particle emission
            maxParticles: 1000, // Limit the number of particles
            blendMode: 'ADD', // Blend mode for glowing effect
        });

        // Emit particles when the pointer is moved
        this.input.on('pointermove', (pointer) => {
            this.emitter.emitParticle(5, pointer.x, pointer.y);
        });

        // Stop emitting particles on mouse up
        this.input.on('pointerup', () => {
            this.emitter.stop(); // Stop emitting particles
        });
    }

    update() {
        this.i = (this.i + 1) % 360; // Cycle through colors

        // Update all particles to follow the HSV color wheel dynamically
        this.emitter.forEachAlive((particle) => {
            particle.tint = this.hsv[this.i].color;
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,  // Set width to the window's width
    height: window.innerHeight, // Set height to the window's height
    backgroundColor: '#000',
    parent: 'phaser-example',
    scene: Example,
    scale: {
        mode: Phaser.Scale.FIT,   // Fit to the screen without going fullscreen
        autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
    }
};

// Resize the game on window resize
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

const game = new Phaser.Game(config);
