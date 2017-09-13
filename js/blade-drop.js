class BladeDrop {
  constructor(canvasGrid, col, row) {
    this.canvasGrid = canvasGrid;
    this.col = col;
    this.row = row;
  }

  update() {}

  draw() {
    this.canvasGrid.drawSquare(this.col, this.row, LIGHT_GRAY);
  }
}
