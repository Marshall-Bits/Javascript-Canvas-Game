class Game {
    constructor(ctx, player, projectiles, secondaries, background, lifes) {
        this.ctx = ctx
        this.player = player
        this.projectiles = projectiles
        this.secondaries = secondaries
        this.background = background
        this.lifes = lifes
        this.frameNumber = null
        this.mouseY = 0

        ctx.canvas.addEventListener("mousemove", e => {
            this.mouseY = e.clientY;
        })
        ctx.canvas.addEventListener("click", e => {
            this.shootProjectile();
        })
    }

    start() {
        this.init()
        this.play()
    }

    init() {
        this.frameNumber = 0;
        this.lifes.init();
    }

    play() {
        this.move();
        this.draw();
        if (this.frameNumber % 10 === 0) {
            this.collitionsManagement();
        }
        this.checkCollitions();
        this.removeWhenOutOfScreen();
        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this));
        }
        
    }

    move() {
        this.background.move();
        this.player.move(this.mouseY);
        this.secondaries.move(this.frameNumber);
        this.projectiles.move()
    }

    removeWhenOutOfScreen() {
        this.secondaries.enemies = this.secondaries.removeWhenOutOfScreen(this.secondaries.enemies);
        this.secondaries.rewards = this.secondaries.removeWhenOutOfScreen(this.secondaries.rewards);
    }

    draw() {
        this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.player.draw();
        this.secondaries.draw();
        this.lifes.draw();
        this.projectiles.draw();
    }

    checkCollitions() {
        let hasCollidedWith = "";

        this.secondaries.rewards.forEach(element => {
            if (this.player.collidesWith(element)) {
                hasCollidedWith = "reward"
            }
        });


        this.secondaries.enemies.forEach(element => {
            if (this.player.collidesWith(element)) {
                hasCollidedWith = "enemy"
            }
        });

        return hasCollidedWith
    }

    collitionsManagement() {
        if (this.checkCollitions() === "enemy") {
            this.lifes.removeLife()
        }
        if (this.checkCollitions() === "reward") {
            this.lifes.addLife()
        }
    }

    shootProjectile() {
        console.log(this.projectiles.projectiles)
        this.projectiles.newProjectile(this.player.y)
    }
}

