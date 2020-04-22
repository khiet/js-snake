function setupInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  let fps = 30;
  setInterval(callBoth, 1000 / fps);

  setupInput();
  loadCarImage();
  resetCar();
});

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  moveCar();
  handleTrackCollision();
}

function drawAll() {
  clearScreen();
  drawCar();
  drawTracks();
}

function clearScreen() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}
