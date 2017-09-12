class RainDrop {
  constructor(canvasGrid) {
    this.canvasGrid = canvasGrid;
    this.col = null;
    this.row = null;
  }

  update(col, row) {
    this.col = col;
    this.row = row;
  }

  draw() {
    this.canvasGrid.drawSquare(this.col, this.row, BRIGHT_BLUE);
  }
}
