let canvas;
let canvasContext;

let head = new Head();
const headWorkdIndex = 145;
let foodWorldIndex = 154;

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  startGarme();
});

function startGarme() {
  let fps = 30;
  setInterval(callBoth, 1000 / fps);
  setupInput();
  loadWorld(baseWorld);
};

function loadWorld(world) {
  worldGrid = world.slice();

  const snakePoint = worldPointAtIndex(headWorkdIndex);
  head.reset(snakePoint.x, snakePoint.y);
}

function callBoth() {
  moveAll();
  drawAll();
  handleCollision();
  showDebugInfo();
}

function moveAll() {
  head.move();
  head.tails.forEach((tail) => tail.move());
}

function handleCollision() {
  foodWorldIndex = handleWorldCollision(head, foodWorldIndex);
}

function drawAll() {
  drawBaseWorld();
  drawFood(foodWorldIndex);

  head.draw();
  head.tails.forEach((tail) => tail.draw());
}

function showDebugInfo() {
  document.querySelector('.js-debug-info').textContent = `eatCount: ${head.eatCount}`;
}
