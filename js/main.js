let car1 = new Car();

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  colorText('Loading...', canvas.width / 2, canvas.height / 2, 'black', 64, 'center');

  loadImages();
});

function setupInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function startGarme() {
  let fps = 30;
  setInterval(callBoth, 1000 / fps);

  setupInput();
  car1.resetCar();
};

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  car1.moveCar();
  handleTrackCollision(car1);
}

function drawAll() {
  drawTracks();
  drawCar(carPic, car1);
}
