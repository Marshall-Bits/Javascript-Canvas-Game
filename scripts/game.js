class Game {
    constructor(ctx, player, projectiles, secondaries, background, lifes, score, explosions, sounds, gameOverDiv) {
        this.ctx = ctx
        this.player = player
        this.projectiles = projectiles
        this.secondaries = secondaries
        this.background = background
        this.lifes = lifes
        this.score = score
        this.sounds = sounds
        this.gameOverDiv = gameOverDiv
        this.explosions = explosions
        this.frameNumber = null
        this.mouseY = 0


        ctx.canvas.addEventListener("mousemove", e => {
            this.mouseY = e.clientY;
        })
        ctx.canvas.addEventListener("click", e => {
            this.player.shootProjectile();
            this.sounds.play(this.sounds.projectile)
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
        this.sounds.play(this.sounds.gameOver);
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
        this.collitionManagement();
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
        if (this.frameNumber < 500) return
        if (this.frameNumber % 1001 === 0) {
            this.background.backgroundImage.vx -= 2;
            this.secondaries.increaseSpeed();
            this.secondaries.spawnRateEnemy = Math.round(this.secondaries.spawnRateEnemy / 2);
            this.score.score += 1000;
            this.sounds.play(this.sounds.levelUp);
        }
    }

    move() {
        this.background.move();
        this.player.move(this.mouseY);
        this.secondaries.move(this.frameNumber);
        this.projectiles.move()
    }


    draw() {
        this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.background.draw();
        this.player.draw(this.frameNumber);
        this.secondaries.draw();
        this.lifes.draw();
        this.projectiles.draw();
        this.explosions.draw();
        this.score.draw();
    }

    collitionManagement() {

        this.secondaries.rewards.forEach(reward => {
            if (this.player.collidesWith(reward)) {
                let index = this.secondaries.rewards.indexOf(reward);
                this.secondaries.rewards.splice(index, 1);
                this.lifes.addLife();
                this.sounds.play(this.sounds.reward);
            }
        });

        this.secondaries.enemies.forEach(enemy => {
            if (this.player.collidesWith(enemy)) {
                let index = this.secondaries.enemies.indexOf(enemy);
                this.secondaries.enemies.splice(index, 1);
                this.lifes.removeLife();
                this.sounds.play(this.sounds.looseLife);
                this.player.knockBack();
            }
        });

        this.secondaries.enemies.forEach(enemy => {
            if (this.projectiles.collidesWith(enemy)) {
                let index = this.secondaries.enemies.indexOf(enemy);
                this.explosions.newExplosion(enemy.x, enemy.y);
                this.secondaries.enemies.splice(index, 1);
                this.explosions.deleteLastExplosion();
                this.score.addPoint();
                this.sounds.play(this.sounds.deadEnemy);
            }
        })

        this.secondaries.rewards.forEach(reward => {

            if (this.projectiles.collidesWith(reward)) {
                let index = this.secondaries.rewards.indexOf(reward);
                this.explosions.newExplosion(reward.x, reward.y);
                this.explosions.deleteLastExplosion();
                this.secondaries.rewards.splice(index, 1);
                this.score.subtractPoint();
                this.sounds.play(this.sounds.deadEnemy);
            }
        })


    }

}

