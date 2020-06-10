function drawSnakePart(snakePart, color) {
  Graphics.colorRect(canvasContext, snakePart.x, snakePart.y, snakePart.height, snakePart.height, color);
}

function drawFood(world, foodIndex) {
  const foodPoint = world.worldPointAtIndex(foodIndex);
  Graphics.colorRect(canvasContext, foodPoint.x, foodPoint.y, world.tile_w, world.tile_h, 'darksalmon');
}

function drawGrid(world) {
  const tileColors = {
    [world.tile_white]: 'whitesmoke',
    [world.tile_black]: 'gainsboro',
    [world.tile_wall]: 'lightgrey',
  };
  let worldIndex = 0;
  let worldTileX = 0;
  let worldTileY = 0;

  for (let i = 0; i < world.tile_rows; i++) {
    for (let j = 0; j < world.tile_columns; j++) {
      let worldType = world.grid[worldIndex];
      Graphics.colorRect(world.canvasContext, worldTileX, worldTileY, world.tile_w, world.tile_h, tileColors[worldType]);
      worldIndex++;
      worldTileX += world.tile_w;
    }
    worldTileX = 0;
    worldTileY += world.tile_h;
  }
}
