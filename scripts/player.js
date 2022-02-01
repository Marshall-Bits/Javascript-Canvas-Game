class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 30
        this.y = this.ctx.canvas.height / 2

        this.spriteNumber = 0;
        this.width = 70
        this.height = 70

      
        this.sprite = new Image
        this.sprite.src = `img/player0.png`
    }


    animation() {
        if(this.frameNumber % 10 === 0) this.spriteNumber +=1;
        if(this.spriteNumber>2) this.spriteNumber = 0;
        
        this.sprite.src = `img/player${this.spriteNumber}.png`
        
    }

    draw(frameNumber) {
        this.ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            this.width,
            this.height
        )
        this.animation()
    }



    init() {
        this.x = 30;
        this.y = this.ctx.canvas.height / 2;
    }

    move(mouseY) {
        this.y = mouseY;
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