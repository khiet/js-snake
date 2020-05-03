let car1 = new Car();
let car2 = new Car();
let selectedTrackLevel = 1;

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  colorText('Loading...', canvas.width / 2, canvas.height / 2, 'black', 64, 'center');

  document.querySelector('.js-track-level-select').addEventListener('change', function (e) {
    selectedTrackLevel = parseInt(e.currentTarget.value, 10);
    loadLevel(trackLevels[selectedTrackLevel - 1]);
  });

  loadImages();
});

function startGarme() {
  let fps = 30;
  setInterval(callBoth, 1000 / fps);
  setupInput();
  loadLevel(trackLevels[selectedTrackLevel - 1]);
};

function loadLevel(levelTrack) {
  trackGrid = levelTrack.slice();
  car1.resetCar('Blue Car');
  car2.resetCar('Green Car');
}

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
  car1.drawCar(car1Pic);
  car2.drawCar(car2Pic);
}
