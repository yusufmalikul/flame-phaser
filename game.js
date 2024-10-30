class Example extends Phaser.Scene {
    preload() {
        this.load.image('brush', 'yellow.png'); // Load the brush image
    }

    create() {
        this.hsv = Phaser.Display.Color.HSVColorWheel(); // Create an HSV color wheel
        this.i = 0;

        // Create the particle emitter with a very long lifespan and set the scale to 5
        this.emitter = this.add.particles(0, 0, 'brush', {
            speed: 0,                  // Set speed to 0 to stop particles from moving
            tint: this.hsv[0].color,
            gravityY: 0,              // No gravity effect
            frequency: 100,            // Frequency of particle emission
            maxParticles: 100,         // Limit the number of particles
            scale: { start: 5, end: 5 } // Set scale to make particles 5x bigger
        });

        // Enable input events
        this.input.on('pointermove', (pointer) => {
            // Update emitter position to mouse position
            this.emitter.x = pointer.x;
            this.emitter.y = pointer.y;
        });

        // Start emitting particles on mouse click
        this.input.on('pointerdown', (pointer) => {
            this.emitter.start(); // Start emitting particles
        });

        // Stop emitting particles on mouse up
        this.input.on('pointerup', () => {
            this.emitter.stop(); // Stop emitting particles
        });
    }

    update() {
        this.i++;

        if (this.i === 360) {
            this.i = 0;
        }

        this.emitter.particleTint = this.hsv[this.i].color; // Cycle through colors
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

const game = new Phaser.Game(config);
