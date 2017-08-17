class Ground {
  constructor(canvasGrid) {
    this.canvasGrid = canvasGrid;
    this.planted = false;
  }

  initialize() {
    // Top of soil
    for (let col = 0; col < PIXELS_WIDE; col++) {
      this.canvasGrid.update(col, PIXELS_WIDE - GROUND_HEIGHT, '#5F574F');
    }
    // Ground
    for (let row = PIXELS_WIDE - GROUND_HEIGHT + 1; row < PIXELS_WIDE; row++) {
      for (let col = 0; col < PIXELS_WIDE; col++) {
        this.canvasGrid.update(col, row, '#AB5236');
      }
    }
  }

  addSeed(col, row) {
    if (this.planted) {
      return;
    }
    this.canvasGrid.update(col, row, '#FFA300');
    this.planted = true;
  }
}
