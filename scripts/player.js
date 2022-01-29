class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 4
        this.y = this.ctx.canvas.height / 2

        this.width = 20
        this.height = 20

        this.sprite = new Image
        this.sprite.src = "img/player.png"
    }

    draw() {
        this.ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            this.width,
            this.height
        )
        
    }

    move(mouseY) {
        this.y = mouseY/ 5;
        if (this.y < 0 -20) this.y = 0-20;
        if (this.y > ctx.canvas.height -20) this.y = ctx.canvas.height - 20;
    }
    shootProjectyle() {

    }
}