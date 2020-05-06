function colorRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

function colorCircle(x, y, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(text, x, y, color, size = 16, textAlign = 'left') {
  canvasContext.textAlign = textAlign;
  canvasContext.font = `normal ${size}px Arial`;

  canvasContext.fillStyle = color;
  canvasContext.fillText(text, x, y);
}

function drawBitmapCenteredWithRotation(pic, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x, y);
  canvasContext.rotate(angle);
  drawBitmap(pic, -pic.width / 2, -pic.height / 2);
  canvasContext.restore();
}

function drawBitmapCentered(pic, x, y) {
  canvasContext.drawImage(pic, x - pic.width / 2, y - pic.height / 2);
}

function drawBitmap(pic, x, y) {
  canvasContext.drawImage(pic, x, y);
}
