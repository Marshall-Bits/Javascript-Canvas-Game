class Game {
    constructor(ctx, player, projectiles, secondaries, background) {
        this.ctx = ctx
        this.player = player
        this.secondaries = secondaries
        this.projectiles = projectiles
        this.background = background
        this.frameNumber = null
    }

    start() {
        this.init()
        this.play()
    }
    
    int(){
        this.frameNumber = 0
    }
    
    play(){
        this.frameNumber +=1
        this.ctx.clearRect(0,0,canvas.width, canvas.height)
        this.move()
        this.draw()
        this.checkCollitions()
        requestAnimationFrame(this.play.bind(this))
    }

    move(){

    }

    draw(){

    }
}

