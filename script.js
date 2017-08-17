(() => {
  const canvasElement = document.querySelector('canvas');
  const grid = new CanvasGrid(canvasElement);

  for (let row = 0; row < PIXELS_WIDE; row++) {
    for (let col = 0; col < PIXELS_WIDE; col += 2) {
      const offset = row % 2;
      grid.update(row, col + offset, 'white');
    }
  }
  grid.draw();
})();
