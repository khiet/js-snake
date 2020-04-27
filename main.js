function setupInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  loadImages();
});

function startGarme() {
  let fps = 30;
  setInterval(callBoth, 1000 / fps);

  setupInput();
  resetCar();
};

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  moveCar();
  handleTrackCollision();
}

function drawAll() {
  drawTracks();
  drawCar();
}
