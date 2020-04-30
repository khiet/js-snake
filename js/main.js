let car1 = new Car();
let car2 = new Car();

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
  car2.resetCar();
};

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  car1.moveCar();
  car2.moveCar();
  handleTrackCollision(car1);
  handleTrackCollision(car2);
}

function drawAll() {
  drawTracks();
  drawCar(carPic, car1);
  drawCar(carPic, car2);
}
