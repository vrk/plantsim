class CanvasGrid {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');

    this.canvasRealWidth = window.innerWidth;
    this.canvasRealHeight = window.innerHeight;

    this.canvas.width = this.getCanvasSizeInRealPixels().width;
    this.canvas.height = this.getCanvasSizeInRealPixels().height;

    this.initializePixels();
  }

  getCanvasSizeInRealPixels() {
    return {
      width: this.canvasRealWidth,
      height: this.canvasRealHeight
    };
  }

  getCanvasSizeInPlantPixels() {
    const canvasSize = this.getCanvasSizeInRealPixels();
    return {
      width: Math.floor(canvasSize.width / PIXEL_SIZE),
      height: Math.floor(canvasSize.height / PIXEL_SIZE)
    };
  }

  isInBounds(col, row) {
    const plantPixelSize = this.getCanvasSizeInPlantPixels();
    if (col < 0 || col >= plantPixelSize.width) {
      return false;
    }
    if (row < 0 || row >= plantPixelSize.height) {
      return false;
    }
    return true;
  }

  isOccupied(col, row) {
    return this.pixelData[col][row] !== null;
  }

  initializePixels() {
    const plantPixelSize = this.getCanvasSizeInPlantPixels();
    this.pixelData = [];
    for (let col = 0; col < plantPixelSize.width; col++) {
      this.pixelData[col] = [];
      for (let row = 0; row < plantPixelSize.height; row++) {
        this.pixelData[col][row] = null;
      }
    }
  }

  update(colPos, rowPos, color) {
    this.pixelData[colPos][rowPos] = color;
  }

  draw() {
    const plantPixelSize = this.getCanvasSizeInPlantPixels();
    for (let col = 0; col < plantPixelSize.width; col++) {
      for (let row = 0; row < plantPixelSize.height; row++) {
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
