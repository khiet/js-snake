let canvas;
let canvasContext;

let head = new Head();
let snakeWorldIndex = 82;
let foodWorldIndex = 150;

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
  head.reset(snakeWorldIndex);
}

function callBoth() {
  moveAll();
  drawAll();
}

function moveAll() {
  head.move();
  head.tails.forEach((tail) => tail.move());

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
