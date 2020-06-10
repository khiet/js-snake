const Collision = {
  handleCollision: function (world, head, foodIndex) {
    if (head.dead) {
      return foodIndex;
    }

    const collidablePoint = head.collidablePoint();

    if (world.worldTypeAt(collidablePoint.x, collidablePoint.y) === world.tile_wall) {
      head.die();
    }

    const collidableIndex = world.worldIndexAt(collidablePoint.x, collidablePoint.y);

    const indexAtTails = function (tails, worldIndex) {
      return tails.findIndex((tail) => world.worldIndexAt(tail.x, tail.y) === worldIndex) !== -1;
    };

    const indexAtBody = function (head, foodIndex) {
      if (world.worldIndexAt(head.x, head.y) === foodIndex) {
        return true;
      }

      return indexAtTails(head.tails, foodIndex);
    };

    const nextFoodIndex = function nextFoodIndex(head, currentIndex) {
      let foodIndex = Math.floor(Math.random() * world.tile_rows * world.tile_columns);
      while (foodIndex === currentIndex ||
        world.worldTypeAtIndex(foodIndex) === world.tile_wall ||
        indexAtBody(head, foodIndex)
      ) {
        foodIndex = Math.floor(Math.random() * world.tile_rows * world.tile_columns);
      }
      return foodIndex;
    };

    if (indexAtTails(head.tails, collidableIndex)) {
      head.die();
    }

    if (collidableIndex === foodIndex) {
      head.eatCount++;
      head.addTail();
      return nextFoodIndex(head, foodIndex);
    }

    return foodIndex;
  }
};
