class Score {
    constructor(ctx){
        this.ctx = ctx
        this.score = 0

        this.x = 50
        this.y = 0
    }

    draw(){
        this.ctx.font = "'Roboto Mono', monospace;";
        ctx.fillText(this.score, this.x, this.y);
    }

    addPoint(){
        this.score ++
    }

    substractPoint(){
        this.score --
        if(score <= 0){
            return
        }
    }
}
