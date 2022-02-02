class Secondaries {
    constructor(ctx) {
        this.ctx = ctx
        this.enemies = []
        this.rewards = []

        this.vxEnemy = -6
        this.vxReward = -10

        this.spawnRateEnemy = 100
        this.spawnRateReward = 500

    }

    move(frameNumber) {

        const randomYposition = () => {
            let random = Math.floor(Math.random() * this.ctx.canvas.height)
            if (random > this.ctx.canvas.height - 60) random -= 60
            return random
        }
        console.log(Math.floor(Math.random()*400));
        if (frameNumber < 20) return

        if (frameNumber % this.spawnRateEnemy === 0) {
            this.enemies.push(this.spawnNewEnemy(randomYposition()))
        }

        if (frameNumber % this.spawnRateReward === 0) {
            this.rewards.push(this.spawnNewReward(randomYposition()))
        }

        this.enemies.forEach(enemy => {
            enemy.x += enemy.vx
        })
        this.rewards.forEach(reward => reward.x += reward.vx)
    }

    removeWhenOutOfScreen(array) {
        const newArray = array.filter((value, index, arr) => {
            return value.x > 0 - value.width
        })
        return newArray
    }

    spawnNewEnemy(position) {
        const newEnemy = {
            sprite: new Image(),

            y: position,
            x: this.ctx.canvas.width,

            width: 40,
            height: 40,
            vx: this.vxEnemy
        }
        newEnemy.sprite.src = "img/enemy.png"

        return newEnemy
    }

    spawnNewReward(position) {
        const newReward = {
            sprite: new Image(),

            y: position,
            x: this.ctx.canvas.width,

            width: 40,
            height: 40,
            vx: this.vxReward
        }
        newReward.sprite.src = "img/reward.png"

        return newReward
    }

    draw() {
        this.enemies.forEach(
            enemy => {
                this.ctx.drawImage(
                    enemy.sprite,
                    enemy.x,
                    enemy.y,
                    enemy.width,
                    enemy.height
                )
            }
        )
        this.rewards.forEach(
            reward => {
                this.ctx.drawImage(
                    reward.sprite,
                    reward.x,
                    reward.y,
                    reward.width,
                    reward.height
                )
            }
        )
    }

    increaseSpeed() {
        this.vxReward -= 2;
        this.vxEnemy -= 2;
    }
}