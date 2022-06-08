const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const dice = document.getElementById("role");
const buttonStart = document.querySelector(".game__setting-button-start");
const gameSetting = document.querySelector(".game__setting");
const gameMap = document.querySelector(".game__wrapper");
const colorValue = document.querySelectorAll(".game__color");
const inputPlayers = document.querySelector('.game__setting-input');
const mixColor = document.querySelector('.mix');
const wrapper = document.querySelector('.game__players');
const soundButton = document.querySelector('.game__buttons-sound');
const closeGame = document.querySelector('.exit');
const replayGame = document.querySelector('.game__end-replay');
const endModal = document.querySelector('.game__end')
const  endGameButton = document.querySelector('.game__end-close');
const settingInput = document.querySelector('.game__setting-input');

let queue = 0;
let box = 60;
let soundMute = false;

settingInput.addEventListener('input', ()=>{
   moveInput(settingInput.value)
})

function moveInput (value){
   value -= 1;
   const percent = (value)  / (3) * 100;
   settingInput.style.background = `linear-gradient(to right, rgba(255, 0, 0, 0.5) 0%, rgba(15, 210, 241, 1) ${percent}%, rgba(15, 210, 241, 1) ${percent}%, rgba(255, 0, 0, 0.5) 100%)`
}

replayGame.addEventListener('click',()=>{
   gameSetting.classList.add("active");
   endModal.classList.remove('active')
})

endGameButton.addEventListener('click',()=>{
   document.querySelector('.game').classList.remove('active')
})

function endGameModal (player) {
   gameSetting.classList.remove("active");
   gameMap.classList.remove("active");
   wrapper.innerHTML= "";
   endModal.classList.add('active')
   document.querySelector('.game__end-title').innerHTML = `<p>Поздравляем победителя <br> Игрок ${player}</p>`
}



closeGame.addEventListener('click', ()=>{
   gameSetting.classList.add("active");
   gameMap.classList.remove("active");
   wrapper.innerHTML= "";
})

mixColor.addEventListener('click', ()=> {
   players.forEach(e => {
      const color = `rgb(${Math.round(
         Math.random() * (255 - 1) + 1
      )}, ${Math.round(Math.random() * (255 - 1) + 1)}, ${Math.round(
         Math.random() * (255 - 1) + 1
      )})`;
      e.color = color;
      wrapper.innerHTML= "";
      makeTablet ();
   })
})

soundButton.addEventListener('click', ()=> {
   soundButton.classList.toggle('active')
   if (soundMute === false) {
      return soundMute = true;
   } else {
      return soundMute = false;
   }
})


inputPlayers.addEventListener('input', ()=> {
   document.querySelector('.game__setting-number-title').textContent = inputPlayers.value
   return inputPlayers.value
})

function makeTablet () {
   players.forEach(e => {
      createPlayerString (e.color,e.id)
   })
}

function createPlayerString (color,id) {
   const player = document.createElement('div')
   player.className = "game__player";
   player.innerHTML = `<div style="background: ${color};" ></div><h3>Игрок ${id}</h3>`
   wrapper.append(player)
}

buttonStart.addEventListener("click", () => {
   creatPlayers (Number(inputPlayers.value))
   gameSetting.classList.remove("active");
   gameMap.classList.add("active");
   makeTablet ();
   startGame();
});

function endGame() {
   dice.removeEventListener("click", mechanics);
}

function startGame() {
   dice.addEventListener("click", mechanics)
}

function mechanics() {
   let point = Math.round(Math.random() * (6 - 1) + 1);
   soundCube();
   let edgeName = point;
   switch (point) {
      case point:
         cube.style.transform =
            "perspective(700px) rotateX(45deg) rotateY(70deg)";
         setTimeout(() => {
            cube.style.transform =
               "perspective(700px) rotateX(180deg) rotateY(180deg)";
         }, 200);
         setTimeout(() => {
            cube.style.transform =
               "perspective(700px) rotateX(360deg) rotateY(41deg)";
         }, 400);
         setTimeout(() => {
            cube.style.transform =
               "perspective(700px) rotateX(" +
               degs[edgeName].X +
               "deg) rotateY(" +
               degs[edgeName].Y +
               "deg)";
         }, 600);
         break;
   }
   setTimeout(() => {
      move(queue, point);
      queues();
   }, 1100);
   endGame()
}

const ground = new Image();
ground.src = "./img/map.jpg";




function soundCube() {
   let audio = new Audio();
   audio.src = "./audio/cube.mp3";
   audio.src = "audio/cube.mp3";
   audio.autoplay = true;
   audio.muted = soundMute;
}
function soundMove() {
   let audio = new Audio();
   audio.src = "audio/move.mp3";
   audio.autoplay = true;
   audio.muted = soundMute;
}
function soundDown() {
   let audio = new Audio();
   audio.src = "audio/sad.mp3";
   audio.autoplay = true;
   audio.muted = soundMute;
}
function soundUp() {
   let audio = new Audio();
   audio.src = "audio/moveUP.mp3";
   audio.autoplay = true;
   audio.muted = soundMute;
}

class player {
   constructor(id, positionX, positionY, score, color, speed) {
      this.positionX = positionX;
      this.positionY = positionY;
      this.id = id;
      this.score = score;
      this.color = color;
      this.speed = speed;
   }
   fill() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(
         this.positionX * box - 30,
         box * this.positionY - 30,
         10,
         0,
         Math.PI * 2,
         true
      );
      ctx.fill();
   }

   moveX(point) {
      for (let i = 0; i < point; i++) {
         const isLast = (this.score + i) % 10 === 0;
         if (!isLast) {
            setTimeout(() => {
               soundMove();
               let mark = this.positionY % 2;
               switch (mark) {
                  case 0:
                     this.positionX += 1;
                     break;
                  case 1:
                     this.positionX -= 1;
                     break;
               }
               if (this.positionX === 1 && this.positionY === 1) {
                  endGameModal(this.id)
               }
            }, this.speed * i + 1);
         } else {
            setTimeout(() => {
               soundMove();
               this.positionY -= 1;
            }, this.speed * i + 1);
         }
      }
      this.score += point;
      setTimeout(() => {
         switch (this.score) {
            case 4:
               soundUp(), (this.positionX = 7), (this.positionY = 9);
               this.score = 14;
               break;
            case 9:
               soundUp(),
                  (this.positionX = 10),
                  (this.positionY = 7),
                  (this.score = 31);
               break;
            case 21:
               soundUp(),
                  (this.positionX = 2),
                  (this.positionY = 6),
                  (this.score = 42);
               break;
            case 28:
               soundUp(),
                  (this.positionX = 4),
                  (this.positionY = 2),
                  (this.score = 84);
               break;
            case 51:
               soundUp(),
                  (this.positionX = 7),
                  (this.positionY = 4),
                  (this.score = 67);
               break;
            case 71:
               soundUp(),
                  (this.positionX = 10),
                  (this.positionY = 1),
                  (this.score = 91);
               break;
            case 80:
               soundUp(),
                  (this.positionX = 1),
                  (this.positionY = 1),
                  (this.score = 100);
                  endGameModal (this.id)
               break;
            case 17:
               soundDown(),
                  (this.positionX = 7),
                  (this.positionY = 10),
                  (this.score = 7);
               break;
            case 54:
               soundDown(),
                  (this.positionX = 7),
                  (this.positionY = 7),
                  (this.score = 34);
               break;
            case 62:
               soundDown(),
                  (this.positionX = 2),
                  (this.positionY = 9),
                  (this.score = 19);
               break;
            case 64:
               soundDown(),
                  (this.positionX = 1),
                  (this.positionY = 5),
                  (this.score = 60);
               break;
            case 87:
               soundDown(),
                  (this.positionX = 4),
                  (this.positionY = 8),
                  (this.score = 24);
               break;
            case 93:
               soundDown(),
                  (this.positionX = 8),
                  (this.positionY = 3),
                  (this.score = 73);
               break;
            case 95:
               soundDown(),
                  (this.positionX = 6),
                  (this.positionY = 3),
                  (this.score = 75);
               break;
            case 98:
               soundDown(),
                  (this.positionX = 2),
                  (this.positionY = 3),
                  (this.score = 79);
               break;
         }
         // comparison(this.score,this.id)
         startGame()
      }, this.speed * point + 1);
   }
}


// function comparison (score, id) {
//    for (i = 0; i+1 < players.length; i++){
//       if(JSON.stringify(score) === JSON.stringify(players[i+1].score)){
//          players[i].hi()
//          players[id-1].hi()
//       }
//    }

// }

// // JSON.stringify(players[i]) === JSON.stringify(players[i+1])

let players=[]



function creatPlayers (x) {
   return  players = Array(x)
   .fill()
   .map((item, index) => {
      const color = `rgb(${Math.round(
         Math.random() * (255 - 1) + 1
      )}, ${Math.round(Math.random() * (255 - 1) + 1)}, ${Math.round(
         Math.random() * (255 - 1) + 1
      )})`;
      return new player(index + 1, 1, 10, 1, color, 300);
   });
}

function move(queue, point) {
   players[queue].moveX(point);
}

function queues() {
   if (queue + 1 < players.length) {
      return (queue += 1);
   } else {
      return (queue = 0);
   }
}

function map() {
   ctx.drawImage(ground, 0, 0);
}

function drawGame() {
   map();
   players.forEach((item) => item.fill());
   requestAnimationFrame(drawGame);
}

drawGame();

const cube = document.querySelector(".cube-game");
const degs = {
   1: { X: -180, Y: 10 },
   5: { X: 80, Y: 0 },
   6: { X: -10, Y: 10 },
   2: { X: -100, Y: 0 },
   4: { X: 0, Y: -100 },
   3: { X: -10, Y: 90 },
};


