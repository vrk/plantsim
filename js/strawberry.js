class Strawberry {
  constructor(plantNode, canvasGrid, size) {
    this.plantNode = plantNode;
    this.col = this.plantNode.col;
    this.row = this.plantNode.row;
    this.canvasGrid = canvasGrid;
    this.size = size;
    this.isGrown = false;
    this.daysOld = 0;

    // Decide on random decisions.

    // Between 2 orientations.
    this.orientation = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
    // Between 1 possible skip.
    this.possibleSkipIndex = Math.floor(Math.random() * 3);
    // Top of strawberry.
    this.topPosition = Math.floor(Math.random() * 3);
    if (this.size !== SMALL_SIZE) {
      this.topPosition = 1;
    }

    // Which side to lean on a MEDIUM_SIZE strawberry.
    this.strawbSideOffset = Math.floor(Math.random() * 2) === 0 ? -2 : 2;
  }

  grow() {
    if (this.isGrown) {
      return;
    }

    if (this.daysOld === 0) {
      this.drawStem();
    } else if (this.daysOld === 2) {
      this.drawFlower();
    } else if (this.daysOld === 7) {
      this.drawStrawberryStub();
    } else if (this.daysOld === 9) {
      this.drawSmallStrawberry(YOUNG_STRAWBERRY, PICO_WHITE);
    } else if (this.daysOld === 12) {
      if (this.size == SMALL_SIZE) {
        this.drawSmallStrawberry(RED_STRAWBERRY, PINK_STRAWBERRY, true);
        this.isGrown = true;
      } else {
        this.drawMediumStrawberryPartOne(YOUNG_STRAWBERRY, PICO_WHITE);
      }
    }

    if (this.size === MEDIUM_SIZE) {
      if (this.daysOld === 14) {
        this.drawMediumStrawberryPartTwo(YOUNG_STRAWBERRY, PICO_WHITE);
      } else if (this.daysOld === 16) {
        this.drawMediumStrawberryPartTwo(RED_STRAWBERRY, PINK_STRAWBERRY);
        this.isGrown = true;
      }
    } else if (this.size === LARGE_SIZE) {
      if (this.daysOld === 14) {
        this.drawMediumStrawberryPartTwo(YOUNG_STRAWBERRY, PICO_WHITE);
      } else if (this.daysOld === 16) {
        this.drawLargeStraberryPartOne(YOUNG_STRAWBERRY, PICO_WHITE);
      } else if (this.daysOld === 18) {
        this.drawLargeStraberryPartTwo(YOUNG_STRAWBERRY, PICO_WHITE);
      } else if (this.daysOld === 20) {
        this.drawLargeStraberryPartThree(YOUNG_STRAWBERRY, PICO_WHITE);
      } else if (this.daysOld === 22) {
        this.drawMediumStrawberryPartTwo(RED_STRAWBERRY, PINK_STRAWBERRY);
        this.drawLargeStraberryPartOne(RED_STRAWBERRY, PINK_STRAWBERRY);
        this.drawLargeStraberryPartTwo(RED_STRAWBERRY, PINK_STRAWBERRY);
        this.drawLargeStraberryPartThree(RED_STRAWBERRY, PINK_STRAWBERRY);
      }
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

  //
  //  **
  // ****
  // ^-- (col, row) for this pixel
  drawLargeStraberryPartOne(primary, secondary) {
    const trajectory = this.plantNode.getTrajectory();

    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row - 2, GREEN);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 2, this.row - this.strawbSideOffset, GREEN);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row + 2, GREEN);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 2, this.row + this.strawbSideOffset, GREEN);
    }

    const offset = this.strawbSideOffset === 2 ? -1 : 1;
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row - 3, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition + offset);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 3, this.row - this.strawbSideOffset, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition + offset);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row + 3, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition - offset);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 3, this.row + this.strawbSideOffset, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition - offset);
    }
  }

  drawLargeStraberryPartTwo(primary, secondary) {
    const trajectory = this.plantNode.getTrajectory();

    const offset = this.strawbSideOffset === 2 ? -1 : 1;
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row - 4, primary);
      this.canvasGrid.update(this.col - this.strawbSideOffset - offset, this.row - 5, primary);
      this.canvasGrid.update(this.col - this.strawbSideOffset - 2*offset, this.row - 5, primary);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 4, this.row - this.strawbSideOffset, primary);
      this.canvasGrid.update(this.col - 5, this.row - this.strawbSideOffset - offset, primary);
      this.canvasGrid.update(this.col - 5, this.row - this.strawbSideOffset - 2*offset, primary);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row + 4, primary);
      this.canvasGrid.update(this.col + this.strawbSideOffset + offset, this.row + 5, primary);
      this.canvasGrid.update(this.col + this.strawbSideOffset + 2*offset, this.row + 5, primary);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 4, this.row + this.strawbSideOffset, primary);
      this.canvasGrid.update(this.col + 5, this.row + this.strawbSideOffset + offset, primary);
      this.canvasGrid.update(this.col + 5, this.row + this.strawbSideOffset + 2*offset, primary);
    }
  }


  drawLargeStraberryPartThree(primary, secondary) {
    const trajectory = this.plantNode.getTrajectory();

    const offset = this.strawbSideOffset === 2 ? -1 : 1;
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row - 4, primary);

      this.canvasGrid.update(this.col + this.strawbSideOffset + offset, this.row - 5, primary);

      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row - 5, primary);
      this.canvasGrid.update(this.col - this.strawbSideOffset - offset, this.row - 6, primary);
      this.canvasGrid.update(this.col - this.strawbSideOffset - 2*offset, this.row - 6, primary);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 4, this.row + this.strawbSideOffset, primary);
      this.canvasGrid.update(this.col - 5, this.row - this.strawbSideOffset, primary);

      this.canvasGrid.update(this.col - 5, this.row + this.strawbSideOffset + offset, primary);

      this.canvasGrid.update(this.col - 6, this.row - this.strawbSideOffset - offset, primary);
      this.canvasGrid.update(this.col - 6, this.row - this.strawbSideOffset - 2*offset, primary);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row + 4, primary);
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row + 5, primary);

      this.canvasGrid.update(this.col - this.strawbSideOffset - offset, this.row + 5, primary);

      this.canvasGrid.update(this.col + this.strawbSideOffset + offset, this.row + 6, primary);
      this.canvasGrid.update(this.col + this.strawbSideOffset + 2*offset, this.row + 6, primary);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 4, this.row - this.strawbSideOffset, primary);
      this.canvasGrid.update(this.col + 5, this.row + this.strawbSideOffset, primary);

      this.canvasGrid.update(this.col + 5, this.row - this.strawbSideOffset - offset, primary);

      this.canvasGrid.update(this.col + 6, this.row + this.strawbSideOffset + offset, primary);
      this.canvasGrid.update(this.col + 6, this.row + this.strawbSideOffset + 2*offset, primary);
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


  drawSmallStrawberryTopper(trajectory, color, topPosition) {
    let col;
    let row;
    if (trajectory === TRAVEL_UP) {
      col = this.col - 1 + topPosition;
      row = this.row - 4;
    } else if (trajectory === TRAVEL_LEFT) {
      col = this.col - 4;
      row = this.row - 1 + topPosition;
    } else if (trajectory === TRAVEL_DOWN) {
      col = this.col - 1 + topPosition;
      row = this.row + 4;
    } else if (trajectory === TRAVEL_RIGHT) {
      col = this.col + 4;
      row = this.row - 1 + topPosition;
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
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition);
    }
  }

  drawMediumStrawberryPartOne(primary, secondary) {
    this.drawSmallStrawberry(primary, secondary, true);

    const trajectory = this.plantNode.getTrajectory();
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row - 2, GREEN);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 2, this.row + this.strawbSideOffset, GREEN);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row + 2, GREEN);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 2, this.row - this.strawbSideOffset, GREEN);
    }
  }

  drawMediumStrawberryPartTwo(primary, secondary) {
    this.drawMediumStrawberryPartOne(primary, secondary);

    const trajectory = this.plantNode.getTrajectory();
    const offset = this.strawbSideOffset === 2 ? 1 : -1;
    if (trajectory === TRAVEL_UP) {
      this.canvasGrid.update(this.col + this.strawbSideOffset, this.row - 3, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition + offset);
    } else if (trajectory === TRAVEL_LEFT) {
      this.canvasGrid.update(this.col - 3, this.row + this.strawbSideOffset, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition + offset);
    } else if (trajectory === TRAVEL_DOWN) {
      this.canvasGrid.update(this.col - this.strawbSideOffset, this.row + 3, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition - offset);
    } else if (trajectory === TRAVEL_RIGHT) {
      this.canvasGrid.update(this.col + 3, this.row - this.strawbSideOffset, primary);
      this.drawSmallStrawberryTopper(trajectory, primary, this.topPosition - offset);
    }


    //   *
    // ****
    //
  }


}
