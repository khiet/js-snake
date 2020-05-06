let warrior = new Warrior();
let selectedWorldLevel = 1;

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  colorText('Loading...', canvas.width / 2, canvas.height / 2, 'black', 64, 'center');

  loadImages();
});

function startGarme() {
  let fps = 30;
  setInterval(callBoth, 1000 / fps);
  setupInput();
  loadLevel(levelOneWorld);
};

function loadLevel(levelWorld) {
  worldGrid = levelWorld.slice();
  warrior.resetWarrior('Blue Warrior');
}

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  warrior.moveWarrior();
  handleWorldCollision(warrior);
}

function drawAll() {
  document.querySelector('.js-debug-info').textContent = `keyCount: ${warrior.keyCount}`;

  drawWorlds();
  warrior.drawWarrior(warriorPic);
}
