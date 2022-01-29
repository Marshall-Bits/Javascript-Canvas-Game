class Secondaries {
    constructor(ctx) {
        this.ctx = ctx
        this.enemies = []
        this.rewards = []

    }

    move(frameNumber) {
        const randomYposition = () => {
            let random = Math.floor(Math.random() * this.ctx.canvas.height)
            if (random > this.ctx.canvas.height - 20) random -= 20
            return random
        }

        if (frameNumber < 20) return

        if (frameNumber % 200 === 0) {
            this.enemies.push(this.spawnNewEnemy(randomYposition()))
        }
        
        if (frameNumber % 300 === 0) {
            this.rewards.push(this.spawnNewReward(randomYposition()))
        }

        this.enemies.forEach(enemie => enemie.x += enemie.vx)
        this.rewards.forEach(reward => reward.x += reward.vx)
    }

    spawnNewEnemy(position) {
        const newEnemie = {
            sprite: new Image(),

            y: position,
            x: this.ctx.canvas.width,

            width: 20,
            height: 20,
            vx: -2
        }
        newEnemie.sprite.src = "img/enemy.png"

        return newEnemie
    }

    spawnNewReward(position) {
        const newEnemie = {
            sprite: new Image(),

            y: position,
            x: this.ctx.canvas.width,

            width: 20,
            height: 20,
            vx: -4
        }
        newEnemie.sprite.src = "img/reward.png"

        return newEnemie
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
}