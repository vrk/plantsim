class World {
  constructor() {
    this.canvasElement = document.querySelector('canvas');
    this.canvasGrid = new CanvasGrid(this.canvasElement);
    this.onCanvasClicked = this.onCanvasClicked.bind(this);

    this.ground = new Ground(this.canvasGrid);
  }

  initialize() {
    this.ground.initialize();
    this.canvasElement.addEventListener('click', this.onCanvasClicked);
  }

  draw() {
    this.canvasGrid.draw();
  }

  onCanvasClicked(event) {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const col = Math.floor(xPos / CANVAS_SIZE * PIXELS_WIDE);
    const row = Math.floor(yPos / CANVAS_SIZE * PIXELS_WIDE);

    if (row > PIXELS_WIDE - GROUND_HEIGHT &&
        row < PIXELS_WIDE -  GROUND_HEIGHT / 2) {
      this.ground.addSeed(col, row);
    }
    this.draw();
  }
}
