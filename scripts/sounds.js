class Sounds {
    constructor(ctx){
        this.ctx = ctx
        this.reward = new Audio("audio/reward.mp3")
        this.looseLife = new Audio("audio/looselife.mp3")
        this.porjectile = new Audio("/audio/projectile.mp3")
        this.levelUp = new Audio("audio/levelUp.mp3")
        this.gameOver = new Audio("/audio/GameOver.mp3")

    }
}