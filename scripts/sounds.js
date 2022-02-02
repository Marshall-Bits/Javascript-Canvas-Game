class Sounds {
    constructor(){
        this.projectile = new Audio("audio/projectile.mp3")
        this.projectile = new Audio("audio/projectile.mp3")
        this.reward = new Audio("audio/reward.mp3")
        this.looseLife = new Audio("audio/looselife.mp3")
        this.levelUp = new Audio("audio/levelUp.mp3")
        this.gameOver = new Audio("audio/GameOver.mp3")
        this.deadEnemy = new Audio("audio/deadEnemy.mp3")
    }
    play(sound){
        sound.play()
    }
}

