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
        this.checkCollitions();
        this.collitionsManagement();
        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this));
        }
    }

    move() {
        this.background.move();
        this.player.move(this.mouseY);
        this.secondaries.move(this.frameNumber);
    }

    draw() {
        this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.player.draw();
        this.secondaries.draw();
        this.lifes.draw();
    }

    checkCollitions() {
        if (this.frameNumber % 20 === 0) {
            let hasCollidedWith = "";
            if (this.secondaries.enemies.some((enemy) =>
                this.player.collidesWith(enemy)
            )
            ) return hasCollidedWith = "enemy"

            if (this.secondaries.rewards.some((reward) =>
                this.player.collidesWith(reward)
            )
            ) return hasCollidedWith = "reward"

            return hasCollidedWith
        }
    }

    collitionsManagement() {
        if (this.checkCollitions() === "enemy") {
            this.lifes.removeLife()
        }
        if (this.checkCollitions() === "reward") {
            let rewards = 0;
            rewards++
            console.log(rewards);
            if(rewards % 2 === 0){
                this.lifes.addLife()
            }
        }
    }
}

