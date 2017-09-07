class Ground {
  constructor(canvasGrid) {
    this.canvasGrid = canvasGrid;
    this.planted = false;
  }

  initialize() {
    const plantPixelSize = this.canvasGrid.getCanvasSizeInPlantPixels();
    const groundLevel = plantPixelSize.height -  GROUND_HEIGHT;
    // Top of soil
    for (let col = 0; col < plantPixelSize.width; col++) {
      this.canvasGrid.update(col, groundLevel, '#5F574F');
    }
    // Ground
    for (let row = groundLevel + 1; row < plantPixelSize.height; row++) {
      for (let col = 0; col < plantPixelSize.width; col++) {
        this.canvasGrid.update(col, row, '#AB5236');
      }
    }
  }

  addSeed(col, row) {
    if (this.planted) {
      return;
    }
    this.planted = true;
    this.plant = new Plant(col, row, this.canvasGrid);
    this.plant.update();
    return this.plant;
  }
}
