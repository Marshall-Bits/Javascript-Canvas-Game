const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const player = new Player(ctx);
const background = new Background(ctx);
const secondaries = new Secondaries(ctx);
const projectiles = new Projectiles(ctx);
const lifes = new Lifes(ctx);

const game = new Game(ctx, player, projectiles, secondaries, background, lifes);

const startButton = document.getElementById("start-button");

startButton.onclick= ()=>{
    game.start();
}