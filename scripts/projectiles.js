class Projectiles {

    constructor(ctx) {
        this.ctx = ctx
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
            x: 30,

            width: 40,
            height: 40,
            vx: 6
        }
        newProjectile.sprite.src = "img/enemy.png"

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

    }

}