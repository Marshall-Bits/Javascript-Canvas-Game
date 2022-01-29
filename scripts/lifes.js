class Lifes {
    constructor(ctx) {
        this.ctx = ctx
        this.lifesArray = []


    }
    removeLife() {
        this.lifesArray.pop()
    }
    init() {
        for (let i = 0; i < 3; i++) {
            this.addLife()
        }
    }

    addLife(){
        this.lifesArray.push(this.newLife(this.lifesArray.length * 10))
    }

    newLife(x) {
        const newLife = {
            sprite: new Image(),

            x: x,
            y: this.ctx.canvas.height - 10,

            width: 10,
            height: 10

        }
        newLife.sprite.src = "img/life.png"
        return newLife
    }


    draw() {
        this.lifesArray.forEach(
            life => {
                this.ctx.drawImage(
                    life.sprite,
                    life.x,
                    life.y,
                    life.width,
                    life.height
                )
            }
        )
    }
}