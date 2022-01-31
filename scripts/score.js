class Score {
    constructor(ctx){
        this.ctx = ctx
        this.score = 0

        this.x = 10
        this.y = 40
    }

    draw(){
        this.ctx.font = "20px 'Roboto Mono'";
        this.ctx.fillText(`Score: ${this.score.toString()}`, this.x, this.y);
    }

    addPoint(){
        this.score ++
    }

    subtractPoint(){
        if(this.score <= 0){
            return
        }else this.score --
    }
}
