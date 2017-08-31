class Strawberry {
  constructor(plantNode, canvasGrid) {
    this.plantNode = plantNode;
    this.col = this.plantNode.col;
    this.row = this.plantNode.row;
    this.canvasGrid = canvasGrid;
    this.daysOld = 0;


    // Decide on random decisions.

    // Between 2 orientations.
    this.orientation = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
    // Between 1 possible skip.
    this.possibleSkipIndex = Math.floor(Math.random() * 3);
    // Top of strawberry.
    this.topPosition = Math.floor(Math.random() * 3);
  }

  grow() {
    if (this.daysOld === 0) {
      this.drawStem();
    } else if (this.daysOld === 2) {
      this.drawFlower();
    } else if (this.daysOld === 5) {
      this.drawStrawberryStub();
    } else if (this.daysOld === 10) {
      this.drawSmallStrawberry(YOUNG_STRAWBERRY, PICO_WHITE);
    } else if (this.daysOld === 15) {
      this.drawSmallStrawberry(RED_STRAWBERRY, PINK_STRAWBERRY, true);
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

  drawStrawberryStub() {
    const trajectory = this.plantNode.getTrajectory();
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col - 1, this.row - 2, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 1, this.row - 2, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col, this.row - 3, BRIGHT_YELLOW);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 2, this.row - 1, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col - 2, this.row + 1, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col - 3, this.row, BRIGHT_YELLOW);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col - 1, this.row + 2, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 1, this.row + 2, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col, this.row + 3, BRIGHT_YELLOW);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 2, this.row - 1, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 2, this.row + 1, BRIGHT_YELLOW);
      this.canvasGrid.update(this.col + 3, this.row, BRIGHT_YELLOW);
    }
  }


  updateRect(startCol, endCol, startRow, endRow, color) {
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        this.canvasGrid.update(c, r, color);
      }
    }
  }

  drawSmallStrawberryBody(primary, secondary) {
    const trajectory = this.plantNode.getTrajectory();

    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col, this.row - 1, primary);
      this.updateRect(this.col - 1, this.col + 1, this.row - 3, this.row - 2, primary);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 1, this.row, primary);
      this.updateRect(this.col - 3, this.col - 2, this.row - 1, this.row + 1, primary);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col, this.row + 1, primary);
      this.updateRect(this.col - 1, this.col + 1, this.row + 2, this.row + 3, primary);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 1, this.row, primary);
      this.updateRect(this.col + 2, this.col + 3, this.row - 1, this.row + 1, primary);
    }
  }

  hasSpaceInRectangle(col, row, startCol, endCol, startRow, endRow) {
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        // Skip self.
        if (r === row && c === col) {
          continue;
        }
        if (this.canvasGrid.isOccupied(r, c)) {
          return false;
        }
      }
    }
    return true;
  }

  hasSpaceForTopper(trajectory, col, row) {
    // BROKEN
    if (trajectory === TRAVEL_UP) {
      return this.hasSpaceInRectangle(col, row, col - 1, col + 1, row - 1, row);
    } else if (trajectory === TRAVEL_LEFT) {
      return this.hasSpaceInRectangle(col, row, col - 1, col, row - 1, row + 1);
    } else if (trajectory === TRAVEL_DOWN) {
      return this.hasSpaceInRectangle(col, row, col - 1, col + 1, row, row + 1);
    } else if (trajectory === TRAVEL_RIGHT) {
      return this.hasSpaceInRectangle(col, row, col, col + 1, row - 1, row + 1);
    }
    return false;
  }


  drawSmallStrawberryTopper(trajectory, color) {
    let col;
    let row;
    if (trajectory === TRAVEL_UP) {
      col = this.col - 1 + this.topPosition;
      row = this.row - 4;
    } else if (trajectory === TRAVEL_LEFT) {
      col = this.col - 4;
      row = this.row - 1 + this.topPosition;
    } else if (trajectory === TRAVEL_DOWN) {
      col = this.col - 1 + this.topPosition;
      row = this.row + 4;
    } else if (trajectory === TRAVEL_RIGHT) {
      col = this.col + 4;
      row = this.row - 1 + this.topPosition;
    }
    this.canvasGrid.update(col, row, color);
  }

  drawSmallStrawberryDots(trajectory, color) {

    // Spec between leaves
    if (this.possibleSkipIndex !== 0) {
      if (trajectory === TRAVEL_UP) {
        this.canvasGrid.update(this.col, this.row - 1, color);
      } else if (trajectory === TRAVEL_LEFT) {
        this.canvasGrid.update(this.col - 1, this.row, color);
      } else if (trajectory === TRAVEL_DOWN) {
        this.canvasGrid.update(this.col, this.row + 1, color);
      } else if (trajectory === TRAVEL_RIGHT) {
        this.canvasGrid.update(this.col + 1, this.row, color);
      }
    }

    // Spec in the middle
    if (this.possibleSkipIndex === 0 || this.possibleSkipIndex !== 1) {
      if (trajectory === TRAVEL_UP) {
        this.canvasGrid.update(this.col - this.orientation, this.row - 2, color);
      } else if (trajectory === TRAVEL_LEFT) {
        this.canvasGrid.update(this.col - 2, this.row - this.orientation, color);
      } else if (trajectory === TRAVEL_DOWN) {
        this.canvasGrid.update(this.col + this.orientation, this.row + 2, color);
      } else if (trajectory === TRAVEL_RIGHT) {
        this.canvasGrid.update(this.col + 2, this.row + this.orientation, color);
      }
    }

    // Spec at the top
    if (this.possibleSkipIndex !== 2) {
      if (trajectory === TRAVEL_UP) {
        this.canvasGrid.update(this.col + this.orientation, this.row - 3, color);
      } else if (trajectory === TRAVEL_LEFT) {
        this.canvasGrid.update(this.col - 3, this.row + this.orientation, color);
      } else if (trajectory === TRAVEL_DOWN) {
        this.canvasGrid.update(this.col - this.orientation, this.row + 3, color);
      } else if (trajectory === TRAVEL_RIGHT) {
        this.canvasGrid.update(this.col + 3, this.row - this.orientation, color);
      }
    }
  }

  drawSmallStrawberry(primary, secondary, includeTopper) {
    this.canvasGrid.update(this.col, this.row, DARK_GREEN);
    this.drawSmallStrawberryBody(primary, secondary);

    const trajectory = this.plantNode.getTrajectory();
    this.drawSmallStrawberryDots(trajectory, secondary);
    if (includeTopper) {
      this.drawSmallStrawberryTopper(trajectory, primary);
    }
  }

}
