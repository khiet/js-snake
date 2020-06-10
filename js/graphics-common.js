const Graphics = {
  colorRect: function (canvasContext, x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
  }
}
