const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const player = new Player(ctx);
const background = new Background(ctx);
const secondaries = new Secondaries(ctx);
const projectiles = new Projectiles(ctx);
const lifes = new Lifes(ctx);
const score = new Score(ctx);
const gameOverDiv = document.getElementById("game-over")

const game = new Game(ctx, player, projectiles, secondaries, background, lifes, score, gameOverDiv);

const startButton = document.getElementById("start-button");
const tryAgainButton = document.getElementById("try-again-button");

startButton.onclick= ()=>{
    canvas.style.display = "block";
    startButton.style.display = "none";
    game.start();
}

tryAgainButton.onclick= ()=>{
    gameOverDiv.style.display = "none";
    game.start();
}