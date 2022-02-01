class Background {
    constructor(ctx) {
        this.ctx = ctx

        this.backgroundImage = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            vx: -2, // it only needs x velocity 
            x: 0,
            y: 0

        }
        this.backgroundImage.img.src = "img/background.jpg"

    }

    init() {
        this.backgroundImage.vx = -2;
        this.backgroundImage.x = 0;
        this.backgroundImage.y = 0;
    }

    draw(frameNumber) {
        this.ctx.drawImage( // drawImage(image, x-axis coordinate where to place the top-left corner of the image, y-axis coordinate ...)
            this.backgroundImage.img,
            this.backgroundImage.x,
            this.backgroundImage.y,
            this.backgroundImage.width,
            this.backgroundImage.height
        )
        //Second image attached to the first one to create infinite movement
        this.ctx.drawImage(
            this.backgroundImage.img,
            this.backgroundImage.x + this.backgroundImage.width,
            this.backgroundImage.y,
            this.backgroundImage.width,
            this.backgroundImage.height
        )
    }

    move(frameNumber) {
        this.backgroundImage.x += this.backgroundImage.vx
        if (this.backgroundImage.x + this.backgroundImage.width <= 0) this.backgroundImage.x = 0 // Velocity is substracting on x-Axis 
    }
}