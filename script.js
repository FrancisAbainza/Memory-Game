let body = document.getElementsByTagName("body")[0];
let header = document.querySelector("#header");
let buttons = document.querySelectorAll('[data-buttons]');
let start = document.querySelector("#start");
let points = document.querySelector("#points");
let gameOver = document.querySelector("#gameOver");
let playAgain = document.querySelector("#playAgain");
let pattern = [];
let input = [];
let score = 0;

playAgain.addEventListener('click', () => {
  startGame();
})

start.addEventListener('click', () => {
  startGame();
})

function startGame() {
  gameOver.classList.add("hidden");
  header.classList.add("hidden");
  start.classList.add("displayNone");
  points.classList.remove("displayNone");
  reset();
  continueGame();
}

function reset() {
  buttons.forEach(button => {
    button.classList.remove("active-red");
  })
  score = 0;
  pattern = [];
}

async function continueGame() {
  points.innerHTML = `${score} points`;
  input = [];
  createPattern();
  disableButton(true);
  toggleBG();
  for (let i = 0; i < pattern.length; i++) {
    await delay(500);
    playAudio(pattern[i]);
    buttons[pattern[i]].classList.add("active");
    await delay(500);
    buttons[pattern[i]].classList.remove("active");
  }
  await delay(500);
  toggleBG();
  await delay(500);
  disableButton(false);
}

function createPattern() {
  pattern.push(Math.floor(Math.random() * 9));
}

function disableButton(bool) {
  if(bool === true) {
    buttons.forEach(button => {
      button.classList.remove("hover-active");
      button.removeEventListener('click', checkPattern);
    })
  } else {
    buttons.forEach(button => {
      button.classList.add("hover-active");
      button.addEventListener('click', checkPattern);
    })
  }
}

function toggleBG() {
  body.classList.toggle("dark");
} 

function delay(time) {
  return new Promise(resolve => { setTimeout(() => resolve('Success'), time) });
}

function checkPattern(event) {
  input.push(parseInt(event.target.id));
  /* Comparing the last input to the pattern accordingly */
  if(input[input.length-1] !== pattern[input.length-1]) {
    playAudio("fail");
    endGame(pattern[input.length-1]);
  } else {
    playAudio(input[input.length-1]);
  }

  if(pattern.toString() === input.toString()) {
    score++;
    continueGame();
  } 
}

function playAudio(audioId) {
    switch(audioId) {
      case 0: 
        let audio0 = new Audio('./audio/0.mp3');
        audio0.play();
        break;
      case 1: 
        let audio1 = new Audio('./audio/1.mp3');
        audio1.play();
        break;
      case 2: 
        let audio2 = new Audio('./audio/2.mp3');
        audio2.play();
        break;
      case 3: 
        let audio3 = new Audio('./audio/3.mp3');
        audio3.play();
        break;
      case 4: 
        let audio4 = new Audio('./audio/4.mp3');
        audio4.play();
        break;
      case 5: 
        let audio5 = new Audio('./audio/5.mp3');
        audio5.play();
        break;
      case 6: 
        let audio6 = new Audio('./audio/6.mp3');
        audio6.play();
        break;
      case 7: 
        let audio7 = new Audio('./audio/7.mp3');
        audio7.play();
        break;
      case 8: 
        let audio8 = new Audio('./audio/8.mp3');
        audio8.play();
        break;
      case "fail":
        let audioFail = new Audio('./audio/fail.mp3');
        audioFail.play();
    }
}

async function endGame(lastPattern) {
  disableButton(true);
  for (let i = 0; i < 3; i++) {
    await delay(100);
    buttons[lastPattern].classList.toggle("active-red");
  }
  await delay(500);
  gameOver.classList.remove("hidden");
}