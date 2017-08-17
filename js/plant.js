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

    // Grow straight until we've broken ground.
    if (this.frontierRow >= PIXELS_WIDE -  GROUND_HEIGHT) {
      this.frontierRow--;
    } else {
      // Grow in a random direction -- weighted toward up.
      const random = Math.random();
      if (random < 0.2) {
        this.frontierCol = Math.min(PIXELS_WIDE - 1, this.frontierCol + 1);
      } else if (random < 0.4) {
        this.frontierCol = Math.max(0, this.frontierCol - 1);
      }
      this.frontierRow--;
    }
    this.canvasGrid.update(this.frontierCol, this.frontierRow, GREEN);
  }
}
