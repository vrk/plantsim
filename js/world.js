class World {
  constructor() {
    this.canvasElement = document.querySelector('canvas');
    this.canvasGrid = new CanvasGrid(this.canvasElement);
    this.onCanvasClicked = this.onCanvasClicked.bind(this);
  }

  initialize() {
    this.createGround();
    this.canvasElement.addEventListener('click', this.onCanvasClicked);
  }

  draw() {
    this.canvasGrid.draw();
  }

  createGround() {
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

  onCanvasClicked(event) {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const col = Math.floor(xPos / CANVAS_SIZE * PIXELS_WIDE);
    const row = Math.floor(yPos / CANVAS_SIZE * PIXELS_WIDE);

    if (row > PIXELS_WIDE - GROUND_HEIGHT) {
      this.canvasGrid.update(col, row, '#FFA300');
    }
    this.draw();
  }
}
