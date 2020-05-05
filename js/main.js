let warrior1 = new Warrior();
let selectedTrackLevel = 1;

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
  loadLevel(levelOneTrack);
};

function loadLevel(levelTrack) {
  trackGrid = levelTrack.slice();
  warrior1.resetWarrior('Blue Warrior');
}

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  warrior1.moveWarrior();
  handleTrackCollision(warrior1);
}

function drawAll() {
  drawTracks();
  warrior1.drawWarrior(warrior1Pic);
}
