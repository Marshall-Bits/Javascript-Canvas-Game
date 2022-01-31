class Game {
    constructor(ctx, player, projectiles, secondaries, background, lifes, score) {
        this.ctx = ctx
        this.player = player
        this.projectiles = projectiles
        this.secondaries = secondaries
        this.background = background
        this.lifes = lifes
        this.score = score
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

    stop(){
        cancelAnimationFrame(this.frameNumber)
        this.frameNumber = null;
    }

    init() {
        this.frameNumber = 0;
        this.lifes.init();
    }

    checkForLifes(){
        if(this.lifes.lifesArray.length === 0) this.stop()
    }

    play() {
        this.move();
        this.draw();
        this.checkForLifes();
        this.checkCollitions();
        this.checkProjectileCollition();
        this.removeWhenOutOfScreen();
        this.increaseDifficulty();

        if (this.frameNumber % 10 === 0) {
            this.collitionsManagement();
        }
        
        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this));
        }
        
    }

    increaseDifficulty(){
        if(this.frameNumber === 0) return
        else if (this.frameNumber % 1000 === 0){
            this.background.backgroundImage.vx -= 2;
            this.secondaries.increaseSpeed();
            this.secondaries.spawnRateEnemy = Math.round(this.secondaries.spawnRateEnemy/2);
            this.secondaries.spawnRateReward *= 2;
            this.score.score += 1000;
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
        this.projectiles.projectiles = this.projectiles.removeWhenOutOfScreen(this.projectiles.projectiles);
    }

    draw() {
        this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.player.draw();
        this.secondaries.draw();
        this.lifes.draw();
        this.projectiles.draw();
        this.score.draw();
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
        this.projectiles.newProjectile(this.player.y)
    }

    checkProjectileCollition(){
        this.secondaries.enemies.forEach(element => {
           if(this.projectiles.collidesWith(element)){
               let index = this.secondaries.enemies.indexOf(element);
               
               this.secondaries.enemies.splice(index,1);
               this.score.addPoint();
           }
        })
        this.secondaries.rewards.forEach(element => {
        
            if(this.projectiles.collidesWith(element)){
                let index = this.secondaries.rewards.indexOf(element);
               
                this.secondaries.rewards.splice(index,1);
                this.score.subtractPoint();
            }
         })
    }
}

