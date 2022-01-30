class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 30
        this.y = this.ctx.canvas.height / 2

        this.width = 50
        this.height = 50

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
        this.y = mouseY - 25;
        if (this.y < 0) this.y = 0;
        if (this.y > ctx.canvas.height - this.width) this.y = ctx.canvas.height - this.width;
    }

    collidesWith(secondary) {
        if (this.x >= secondary.x 
            &&
            (this.y > secondary.y
                &&
                this.y < secondary.y + secondary.height
                ||
                this.y + this.height > secondary.y
                &&
                this.y + this.height < secondary.y + secondary.height
                ||
                this.y + (this.height / 2) > secondary.y
                &&
                this.y + (this.height / 2) < secondary.y + secondary.height
            )
        ) {
            return true
        }
    }

    
}