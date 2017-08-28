class CanvasGrid {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');

    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.initializePixels();
  }

  isInBounds(col, row) {
    if (col < 0 || col >= PIXELS_WIDE) {
      return false;
    }
    if (row < 0 || row >= PIXELS_WIDE) {
      return false;
    }
    return true;
  }

  isOccupied(col, row) {
    return this.pixelData[col][row] !== null;
  }

  initializePixels() {
    this.pixelData = [];
    for (let col = 0; col < PIXELS_WIDE; col++) {
      this.pixelData[col] = [];
      for (let row = 0; row < PIXELS_WIDE; row++) {
        this.pixelData[col][row] = null;
      }
    }
  }

  update(colPos, rowPos, color) {
    this.pixelData[colPos][rowPos] = color;
  }

  draw() {
    for (let col = 0; col < PIXELS_WIDE; col++) {
      for (let row = 0; row < PIXELS_WIDE; row++) {
        const colorValue = this.pixelData[col][row];
        if (colorValue) {
          this.drawSquare(col, row, colorValue);
        }
      }
    }
  }

  drawSquare(colPos, rowPos, color) {
    this.context.fillStyle = color;
    this.context.fillRect(
        colPos * PIXEL_SIZE,
        rowPos * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE);
  }


}
