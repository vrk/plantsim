class Strawberry {
  constructor(plantNode, canvasGrid) {
    this.plantNode = plantNode;
    this.col = this.plantNode.col;
    this.row = this.plantNode.row;
    this.canvasGrid = canvasGrid;
    this.daysOld = 0;
  }

  grow() {
    if (this.daysOld === 0) {
      this.drawStem();
    } else if (this.daysOld === 2) {
      this.drawFlower();
    } else if (this.daysOld === 4) {
      this.drawSmallStrawberry();
    }
    this.daysOld++;
  }

  drawStem() {
    const trajectory = this.plantNode.getTrajectory();
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col - 1, this.row - 1, GREEN);
      this.canvasGrid.update(this.col + 1, this.row - 1, GREEN);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 1, this.row - 1, GREEN);
      this.canvasGrid.update(this.col - 1, this.row + 1, GREEN);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col - 1, this.row + 1, GREEN);
      this.canvasGrid.update(this.col + 1, this.row + 1, GREEN);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 1, this.row - 1, GREEN);
      this.canvasGrid.update(this.col + 1, this.row + 1, GREEN);
    }
  }

  drawFlower() {
    const trajectory = this.plantNode.getTrajectory();
    this.canvasGrid.update(this.col, this.row, DARK_GREEN);
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col, this.row - 1, PICO_WHITE);
      this.canvasGrid.update(this.col - 1, this.row - 2, PICO_WHITE);
      this.canvasGrid.update(this.col, this.row - 2, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 1, this.row - 2, PICO_WHITE);
      this.canvasGrid.update(this.col, this.row - 3, PICO_WHITE);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 1, this.row, PICO_WHITE);
      this.canvasGrid.update(this.col - 2, this.row - 1, PICO_WHITE);
      this.canvasGrid.update(this.col - 2, this.row, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col - 2, this.row + 1, PICO_WHITE);
      this.canvasGrid.update(this.col - 3, this.row, PICO_WHITE);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col, this.row + 1, PICO_WHITE);
      this.canvasGrid.update(this.col - 1, this.row + 2, PICO_WHITE);
      this.canvasGrid.update(this.col, this.row + 2, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 1, this.row + 2, PICO_WHITE);
      this.canvasGrid.update(this.col, this.row + 3, PICO_WHITE);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 1, this.row, PICO_WHITE);
      this.canvasGrid.update(this.col + 2, this.row - 1, PICO_WHITE);
      this.canvasGrid.update(this.col + 2, this.row, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 2, this.row + 1, PICO_WHITE);
      this.canvasGrid.update(this.col + 3, this.row, PICO_WHITE);
    }
  }

  updateRect(startCol, endCol, startRow, endRow, color) {
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        this.canvasGrid.update(c, r, color);
      }
    }
  }

  drawSmallStrawberryBody() {
    const trajectory = this.plantNode.getTrajectory();
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col, this.row - 1, YOUNG_STRAWBERRY);
      this.updateRect(this.col - 1, this.col + 1, this.row - 3, this.row - 2, YOUNG_STRAWBERRY);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 1, this.row, YOUNG_STRAWBERRY);
      this.updateRect(this.col - 3, this.col - 2, this.row - 1, this.row + 1, YOUNG_STRAWBERRY);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col, this.row + 1, YOUNG_STRAWBERRY);
      this.updateRect(this.col - 1, this.col + 1, this.row + 2, this.row + 3, YOUNG_STRAWBERRY);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 1, this.row, YOUNG_STRAWBERRY);
      this.updateRect(this.col + 2, this.col + 3, this.row - 1, this.row + 1, YOUNG_STRAWBERRY);
    }
  }

  drawSmallStrawberry() {
    this.canvasGrid.update(this.col, this.row, DARK_GREEN);
    this.drawSmallStrawberryBody();
  }

}
