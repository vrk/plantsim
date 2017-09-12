class RainDrop {
  constructor(canvasGrid, col, row) {
    this.canvasGrid = canvasGrid;
    this.col = col;
    this.row = row;
    this.state = DROP_FALLING;

    this.splashFrame = 1;
  }

  update() {
    if (this.state === DROP_FALLING) {
      if (this.canvasGrid.isOccupiedByVisibleSquare(this.col, this.row + 1)) {
        this.state = DROP_SPLASHING;
      } else {
        this.row++;
        console.assert(this.canvasGrid.isInBounds(this.col, this.row));
      }
    }
  }

  isActive() {
    return this.state !== DROP_DROPPED;
  }

  draw() {
    if (this.state === DROP_FALLING) {
      this.canvasGrid.drawSquare(this.col, this.row, BRIGHT_BLUE);
    } else if (this.state === DROP_SPLASHING) {
      if (this.splashFrame === 1) {
        this.canvasGrid.drawSquare(this.col, this.row - 1, BRIGHT_BLUE);
      } else if (this.splashFrame === 2) {
        this.canvasGrid.drawSquare(this.col - 1, this.row - 1, BRIGHT_BLUE);
        this.canvasGrid.drawSquare(this.col + 1, this.row - 1, BRIGHT_BLUE);
        this.state = DROP_DROPPED;
      }
      this.splashFrame++;
    }
  }
}
