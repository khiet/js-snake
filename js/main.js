let canvas;
let canvasContext;

const head = new Head();
const world = new World();
const intialHeadWorldIndex = 145;
let foodWorldIndex = 154;

document.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  startGarme();
});

function startGarme() {
  const fps = 30;
  setInterval(callBoth, 1000 / fps);

  head.canvasContext = canvasContext;
  world.canvasContext = canvasContext;
  setupInput(world, head);
  resetHead(world, head);

  drawSnakePart(head, 'cadetblue');
};

function resetHead(world, head) {
  const point = world.worldPointAtIndex(intialHeadWorldIndex);
  head.reset({x: point.x, y: point.y, height: world.tile_h});
}

function callBoth() {
  moveAll();
  drawAll();
  foodWorldIndex = Collision.handleCollision(world, head, foodWorldIndex);

  showDebugInfo();
}

function moveAll() {
  head.move();
  head.tails.forEach((tail) => tail.move());
}

function drawAll() {
  drawGrid(world);
  drawFood(world, foodWorldIndex);

  drawSnakePart(head, 'cadetblue')
  head.tails.forEach((tail) => drawSnakePart(tail, 'steelblue'));
}

function showDebugInfo() {
  document.querySelector('.js-debug-info').textContent = `eatCount: ${head.eatCount}`;
}
