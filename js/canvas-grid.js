class CanvasGrid {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');

    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;
  }

  drawSquare(rowPos, colPos) {
    this.context.fillStyle = 'white';
    this.context.fillRect(
        colPos * PIXEL_SIZE,
        rowPos * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE);
  }
}
