class Plant {
  constructor(col, row, canvasGrid) {
    this.seedCol = col;
    this.seedRow = row;
    this.frontierCol = this.seedCol;
    this.frontierRow = this.seedRow;
    this.canvasGrid = canvasGrid;
  }

  update() {
    this.canvasGrid.update(this.seedCol, this.seedRow, '#FFA300');
  }

  updateNextSquare() {
    if (this.frontierRow >= 0 && this.seedRow != this.frontierRow) {
      this.canvasGrid.update(this.frontierCol, this.frontierRow, DARK_GREEN);
    }
    this.frontierRow--;
    this.canvasGrid.update(this.frontierCol, this.frontierRow, GREEN);
  }
}
