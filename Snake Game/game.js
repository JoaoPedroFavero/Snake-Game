`use strict`;
const canvas = document.querySelector(`canvas`);
const background = document.querySelector(`.background`);
const pontuacao = document.querySelector(`.Score > span`);
const menuGameOver = document.querySelector(`.GameOver`);
const btnJogarNovamente = document.querySelector(`.JogarNovamente`);
const ctx = canvas.getContext(`2d`);

const audioComida = new Audio(`../assets/eat song.mp3`);
const audioGameOver = new Audio(`../assets/gameOver song.wav`);
const audioComidaEspecial = new Audio(`../assets/special eat song.wav`);

const size = 14;
const posicaoInicialCobra = {x: 350, y: 350};
let cobra = [posicaoInicialCobra];

const comida = {x: randomPosition(), y: randomPosition(), color: "#f32e2eff"};
const comidaEspecial = {x: randomPosition(), y: randomPosition(), color: `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`};

function randomNumber(min, max){
    return Math.floor(Math.random()*((max + 1) - min) + min);
}

function randomPosition(){ //w: 700, h: 700; -> size = 15;
    const num = randomNumber(14, 686);
    return Math.floor(num/14)*14;
}

let direcao, gameLoopID;

const aumentarPontuacao = () => {
    pontuacao.innerText = parseInt(pontuacao.innerText) + 10;
}

const aumentarPontuacaoEspecial = () => {
    pontuacao.innerText = parseInt(pontuacao.innerText) + 100;
}

const drawComida = () => {
    const {x, y, color} = comida;
    ctx.fillStyle = color;
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#ff4040ff";
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
}

let comidaEspecialAtiva = false;
let spawn = Date.now() + randomNumber(1000, 12000);
let deSpawn = 0;
let atualizacaoCor = 0;

const drawComidaEspecial = () => {
    let agora = Date.now();

    if(!comidaEspecialAtiva && agora >= spawn){
        comidaEspecialAtiva = true;
        deSpawn = agora + 6000;
        atualizacaoCor = agora + 200;
    }

    if(comidaEspecialAtiva){
        if(agora >= atualizacaoCor){
            ctx.fillStyle = comidaEspecial.color;
            ctx.shadowColor = comidaEspecial.color;
            ctx.fillRect(comidaEspecial.x, comidaEspecial.y, size, size);
            ctx.shadowBlur = 14;
            ctx.shadowBlur = 0;
            atualizacaoCor = agora + 200;

            comidaEspecial.color = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
        }

        if(agora >= deSpawn){
            comidaEspecialAtiva = false;
            spawn = agora + randomNumber(10000, 120000);
            comidaEspecial.x = randomPosition();
            comidaEspecial.y = randomPosition();
            
        }
    }
}

const drawCobra = () => {
    ctx.fillStyle = "#cfcfcfff"
    
    cobra.forEach((posicao, index) => {
        if(index == cobra.length - 1){
            ctx.fillStyle = `white`;
        }

        ctx.fillRect(posicao.x, posicao.y, size, size);

    });
}

const moveCobra = () => {
    if(!direcao) return;

    const cabecaCobra = cobra[cobra.length - 1];

    cobra.shift();

    if(direcao == `right`){
        cobra.push({x: cabecaCobra.x + size, y: cabecaCobra.y});
    }

    if(direcao == `left`){
        direcaoAtual = `left`;
        cobra.push({x: cabecaCobra.x - size, y: cabecaCobra.y});
    }

    if(direcao == `up`){
        direcaoAtual = `up`;
        cobra.push({x: cabecaCobra.x, y: cabecaCobra.y - size});
    }

    if(direcao == `down`){
        direcaoAtual = `down`;
        cobra.push({x: cabecaCobra.x, y: cabecaCobra.y + size});
    }
    
}

const comer = () => {
    const cabecaCobra = cobra[cobra.length - 1];
    const caudaCobra = cobra[0];
    if(cabecaCobra.x == comida.x && cabecaCobra.y == comida.y){
        audioComida.play();
        aumentarPontuacao();
        cobra.push({x: cabecaCobra.x, y: cabecaCobra.y});
        
        let x = randomPosition(); 
        let y = randomPosition();

        while(cobra.find((i) => i.x == x && i.y == y)){
            x = randomPosition(); 
            y = randomPosition();
        }
        comida.x = x;
        comida.y = y;

    }

    if(cabecaCobra.x == comidaEspecial.x && cabecaCobra.y == comidaEspecial.y && comidaEspecialAtiva){
        comidaEspecialAtiva = false;
        spawn = Date.now() + randomNumber(1000, 1500);

        audioComidaEspecial.play();
        aumentarPontuacaoEspecial();
        for(let i = 0; i < 5; i++){
            cobra.unshift({x: caudaCobra.x, y: caudaCobra.y});
        }
        
        let x2 = randomPosition();
        let y2 = randomPosition();

        while(cobra.find((i) => i.x == x2 && i.y == y2)){
            x2 = randomPosition();
            y2 = randomPosition();
        }

        comidaEspecial.x = x2;
        comidaEspecial.y = y2;
    }
}

const colisao = () => {
    
    const cabecaCobra = cobra[cobra.length - 1];

    const colisaoCobra = cobra.find((position, index) => {
        return index < cobra.length - 2 && position.x == cabecaCobra.x && position.y == cabecaCobra.y;
    });

    const colisaoCanvas = cabecaCobra.x < 0 || cabecaCobra.y < 0 || cabecaCobra.x >= canvas.width || cabecaCobra.y >= canvas.height;

    if(colisaoCobra || colisaoCanvas){
        gameOver();
    }
}

let gameOverTrue = false;
let gameOverSongTocado = false;
function gameOver(){
    direcao = undefined;
    canvas.style.filter = `blur(10px)`;
    menuGameOver.style.display = `flex`;

    gameOverTrue = true;
    if(gameOverTrue) return; //evita chamar o gameOverTrue novamente (2x);
}

const inGame = () => {
    clearInterval(gameLoopID);

    ctx.clearRect(0, 0, 700, 700);
    drawComida();
    if(pontuacao.innerText > 20){
        drawComidaEspecial();
    }
    moveCobra();
    drawCobra();
    comer();
    colisao();

    gameLoopID = setTimeout(() => {
    inGame();
    }, 75);

    if(gameOverTrue && !gameOverSongTocado){
        audioGameOver.play();
        gameOverSongTocado = true;
    }

}

document.addEventListener(`keydown`, ({key}) => {
    if(key == `ArrowRight` && direcao != `left`){
        direcao = `right`;
    }

    if(key == `ArrowLeft` && direcao != `right`){
        direcao = `left`;
    }

    if(key == `ArrowDown` && direcao != `up`){
        direcao = `down`;
    }

    if(key == `ArrowUp` && direcao != `down`){
        direcao = `up`;
    }
});

btnJogarNovamente.addEventListener(`click`, () =>{
    menuGameOver.style.display = `none`;
    canvas.style.filter = `none`;
    cobra = [posicaoInicialCobra];
    pontuacao.innerText = `00`;
    gameOverTrue = false;
    gameOverSongTocado = false;
});

const fundoDinamico = () => {
    background.width = window.innerWidth;
    background.height = window.innerHeight;
    let matrix = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|]}`;
    matrix.split(``);
}

inGame();