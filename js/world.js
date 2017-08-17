class World {
  constructor() {
    const canvasElement = document.querySelector('canvas');
    this.canvasGrid = new CanvasGrid(canvasElement);
  }

  draw() {
    this.drawGround();
  }

  drawGround() {
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
    this.canvasGrid.draw();
  }
}
