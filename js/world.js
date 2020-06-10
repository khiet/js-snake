class World {
  constructor(opts = {}) {
    this.grid = (opts.grid && opts.grid.slice()) || [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2,
      2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    ];
    this.tile_w = opts.w || 30;
    this.tile_h = opts.h || 30;
    this.tile_rows = opts.rows || 20;
    this.tile_columns = opts.columns || 20;
    this.tile_white = 0;
    this.tile_black = 1;
    this.tile_wall = 2;
  }
  worldIndexAt(x, y) {
    const worldRowColumn = this.worldRowColumnAt(x, y);
    return this.worldIndexAtRowColumn(worldRowColumn.row, worldRowColumn.column);
  }
  worldRowColumnAt(x, y) {
    return {
      row: Math.floor(y / this.tile_h),
      column: Math.floor(x / this.tile_w)
    };
  }
  worldPointAtIndex(index) {
    return {
      x: this.tile_w * (index % (this.tile_columns)),
      y: this.tile_h * Math.floor((index / this.tile_rows))
    };
  }
  worldIndexAtRowColumn(row, column) {
    return (row * this.tile_columns) + column;
  }
  worldTypeAtIndex(index) {
    const worldPoint = this.worldPointAtIndex(index);
    return this.worldTypeAt(worldPoint.x, worldPoint.y);
  }
  worldTypeAt(x, y) {
    const worldIndex = this.worldIndexAt(x, y);
    let worldType;
    if (worldIndex >= 0 && worldIndex < this.grid.length) {
      worldType = this.grid[worldIndex];
    }
    return worldType;
  }
}
