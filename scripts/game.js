class Game {
    constructor(ctx, player, projectiles, secondaries, background, lifes, score, explosions, gameOverDiv) {
        this.ctx = ctx
        this.player = player
        this.projectiles = projectiles
        this.secondaries = secondaries
        this.background = background
        this.lifes = lifes
        this.score = score
        this.gameOverDiv = gameOverDiv
        this.explosions = explosions
        this.frameNumber = null
        this.mouseY = 0
        this.projectileFX = new Audio("audio/projectile.mp3")
        this.rewardFX = new Audio("audio/reward.mp3")
        this.looseLifeFX = new Audio("audio/looselife.mp3")
        this.levelUpFX = new Audio("audio/levelUp.mp3")
        this.gameOverFX = new Audio("audio/GameOver.mp3")
        this.deadEnemyFX = new Audio("audio/deadEnemy.mp3")

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


    stop() {
        cancelAnimationFrame(this.frameNumber)
        this.frameNumber = null;
        this.gameOverDiv.style.display = "flex";
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "white";
        document.getElementById("score").innerText = `Score: ${this.score.score}`;
        this.gameOverFX.play();
    }

    init() {
        this.frameNumber = 0;
        this.lifes.init();
        this.player.init();
        this.secondaries.init();
        this.score.init();
        this.projectiles.init();
        this.background.init();
    }

    checkForLifes() {
        if (this.lifes.lifesArray.length === 0) this.stop()
    }

    play() {
        this.move();
        this.draw();
        this.checkForLifes();
        this.checkCollitions();
        this.checkProjectileCollition();
        this.removeWhenOutOfScreen();
        this.increaseDifficulty();
        this.sendFrameNumber(this.player);
        this.sendFrameNumber(this.secondaries);
        this.sendFrameNumber(this.explosions);


        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this));
        }

    }

    sendFrameNumber(object) {
        object.frameNumber = this.frameNumber
    }

    increaseDifficulty() {
        if (this.frameNumber === 0) return
        if (this.frameNumber % 1001 === 0) {
            this.background.backgroundImage.vx -= 2;
            this.secondaries.increaseSpeed();
            this.secondaries.spawnRateEnemy = Math.round(this.secondaries.spawnRateEnemy / 2);
            this.score.score += 1000;
            this.levelUpFX.play();
        }
    }

    move() {
        this.background.move();
        this.player.move(this.mouseY, this.frameNumber);
        this.secondaries.move(this.frameNumber);
        this.projectiles.move()
    }

    removeWhenOutOfScreen() {
        this.secondaries.enemies = this.secondaries.removeWhenOutOfScreen(this.secondaries.enemies);
        this.secondaries.rewards = this.secondaries.removeWhenOutOfScreen(this.secondaries.rewards);
        this.projectiles.projectiles = this.projectiles.removeWhenOutOfScreen(this.projectiles.projectiles);
    }

    draw() {
        this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.player.draw(this.frameNumber);
        this.secondaries.draw();
        this.lifes.draw();
        this.projectiles.draw();
        this.explosions.draw();
        this.score.draw();
    }

    checkCollitions() {


        this.secondaries.rewards.forEach(element => {
            if (this.player.collidesWith(element)) {
                let index = this.secondaries.rewards.indexOf(element);
                this.secondaries.rewards.splice(index, 1);
                this.lifes.addLife();
                this.rewardFX.play();
            }
        });


        this.secondaries.enemies.forEach(element => {
            if (this.player.collidesWith(element)) {
                let index = this.secondaries.enemies.indexOf(element);
                this.secondaries.enemies.splice(index, 1);
                this.lifes.removeLife();
                this.looseLifeFX.play();
            }
        });


    }





    shootProjectile() {
        this.projectiles.newProjectile(this.player.y);
        this.projectileFX.play()
    }

    checkProjectileCollition() {
        this.secondaries.enemies.forEach(element => {
            if (this.projectiles.collidesWith(element)) {
                let index = this.secondaries.enemies.indexOf(element);
                this.explosions.newExplosion(element.x, element.y);
                this.explosions.deleteLastExplosion();
                this.secondaries.enemies.splice(index, 1);
                this.score.addPoint();
                this.deadEnemyFX.play();
            }
        })
        this.secondaries.rewards.forEach(element => {

            if (this.projectiles.collidesWith(element)) {
                let index = this.secondaries.rewards.indexOf(element);
                this.explosions.newExplosion(element.x, element.y);
                this.explosions.deleteLastExplosion();
                this.secondaries.rewards.splice(index, 1);
                this.score.subtractPoint();
                this.deadEnemyFX.play();
            }
        })
    }
}

