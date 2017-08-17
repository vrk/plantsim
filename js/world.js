class World {
  constructor() {
    const canvasElement = document.querySelector('canvas');
    this.canvasGrid = new CanvasGrid(canvasElement);
  }

  draw() {
    for (let row = 0; row < PIXELS_WIDE; row++) {
      for (let col = 0; col < PIXELS_WIDE; col += 2) {
        const offset = row % 2;
        this.canvasGrid.update(row, col + offset, 'white');
      }
    }
    this.canvasGrid.draw();
  }
}
