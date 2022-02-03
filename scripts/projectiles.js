class Projectiles {

    constructor(ctx) {
        this.ctx = ctx
        this.projectiles = []
    }

    init() {
        this.projectiles = []
    }
    move() {
        this.projectiles.forEach((projectile) => {
            projectile.x += projectile.vx
        })
    }

    newProjectile(playerY) {
        this.projectiles.push(this.spawnNewProjectile(playerY))
    }

    spawnNewProjectile(position) {
        const newProjectile = {
            sprite: new Image(),

            y: position,
            x: 60,

            width: 30,
            height: 30,
            vx: 6
        }
        newProjectile.sprite.src = "img/projectile.png"

        return newProjectile
    }

    draw() {
        this.projectiles.forEach(projectile => {
            this.ctx.drawImage(
                projectile.sprite,
                projectile.x,
                projectile.y,
                projectile.width,
                projectile.height
            )
        })
        this.removeWhenOutOfScreen(this.projectiles);

    }

    removeWhenOutOfScreen(array) {
        array.forEach((element) => {
            let index = array.indexOf(element)
            if (element.x > this.ctx.canvas.width) {
                array.splice(index, 1)
            }
        })
    }

    collidesWith(secondary) {
        let hasCollided = false;
        this.projectiles.forEach((projectile) => {
            if (projectile.x >= secondary.x
                &&
                (projectile.y > secondary.y
                    &&
                    projectile.y < secondary.y + secondary.height
                    ||
                    projectile.y + projectile.height > secondary.y
                    &&
                    projectile.y + projectile.height < secondary.y + secondary.height
                    ||
                    projectile.y + (projectile.height / 2) > secondary.y
                    &&
                    projectile.y + (projectile.height / 2) < secondary.y + secondary.height
                )
            ) {
                hasCollided = true;

                let index = this.projectiles.indexOf(projectile);

                this.projectiles.splice(index, 1);

            }
        })
        return hasCollided
    }

}