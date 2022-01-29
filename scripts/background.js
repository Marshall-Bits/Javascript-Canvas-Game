class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.backgroundImage = {
            img: new Image(),
            width: this.ctx.canvas.width,
            vx: -3
        }

        this.backgroundImage.img.src = "img/background.jpg"
    }
    move(frameNumber) {
        this.backgroundImage.x += this.backgroundImage.vx
        if (this.backgroundImage.x + this.backgroundImage.width <= 0) this.backgroundImage.x = 0
    }
}