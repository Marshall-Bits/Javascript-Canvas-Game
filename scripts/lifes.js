class Lifes {
    constructor(ctx) {
        this.ctx = ctx
        this.lifesArray = []

    }
    
    removeLife() {
        this.lifesArray.pop();
    }

    init() {
        for (let i = 0; i < 3; i++) {
            this.addLife();
        }
    }

    addLife() {
        this.lifesArray.push(this.newLife(this.lifesArray.length * 20));
    }

    animation() {
        this.lifesArray.forEach((life) => {
            if (life.height === 20 && life.width === 20) return
            life.width -= 10;
            life.height -= 10;
        })
    }

    newLife(x) {
        const newLife = {
            sprite: new Image(),

            x: x,
            y: this.ctx.canvas.height - 20,

            width: 40,
            height: 40

        }

        newLife.sprite.src = "img/life.png";

        return newLife;
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
        this.animation()
    }
}