class Explosions {
    constructor(ctx) {
        this.ctx = ctx
        this.explosions = []
        this.spriteNumber = 1
    }

    newExplosion(positionX, positionY) {
        const newExplosion = {
            sprite: new Image(),

            x: positionX -20,
            y: positionY -10,

            width: 90,
            height: 90,
        }
        newExplosion.sprite.src = "img/explosion1.png"

        this.explosions.push(newExplosion)
    }

    animation(array, type) {
        if (this.frameNumber % 5 === 0) this.spriteNumber += 1;
        if (this.spriteNumber > 10) this.spriteNumber = 1;

        array.forEach((e)=>{
            e.sprite.src = `img/${type}${this.spriteNumber}.png`
        })


    }

    deleteLastExplosion(){
        if(this.explosions.length > 0){ 
          setTimeout(() => {
             this.explosions.pop()
            }, 500);

        }
    }

    draw() {
        this.explosions.forEach((
            explosion) => {
            this.ctx.drawImage(
                explosion.sprite,
                explosion.x,
                explosion.y,
                explosion.width,
                explosion.height
            )

        })
        this.animation(this.explosions,"explosion");
    }


}