import { Cell } from './Cell'

function biasedRandomBoolean () {
  return (Math.random() > 0.9)
}

export const PlayResult = {
  nothing: 0,
  won: 1,
  lost: 2
}

export class Board {
  constructor (width, height, maxBombCount) {
    this.width = width
    this.height = height
    this.maxBombCount = maxBombCount
    this.cells = []
    this.bombCount = 0
    this.flagCount = 0
    this.revealedCount = 0

    this.init()
    this.setCellsNearBombCount()
  }

  init () {
    for (let i = 0; i < this.width; i++) {
      this.cells[i] = []
      for (let j = 0; j < this.height; j++) {
        // TODO: Find a better bomb random placement algorithm
        if (this.bombCount === this.maxBombCount) {
          this.cells[i][j] = new Cell(false, i, j)
        } else {
          const hasBomb = biasedRandomBoolean()
          if (hasBomb) {
            this.bombCount++
          }
          this.cells[i][j] = new Cell(hasBomb, i, j)
        }
      }
    }
  }

  setCellsNearBombCount () {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        const cell = this.cells[i][j]

        for (let neighbour of this._neighbourCells(i, j)) {
          if (neighbour.containsBomb) {
            cell.nearBombCount++
          }
        }
      }
    }
  }

  flag (cell) {
    if (cell.isRevealed) {
      return PlayResult.nothing
    }

    cell.switchFlag()

    if (cell.isFlagged) {
      this.flagCount++
    } else {
      this.flagCount--
    }

    return this.winCondition()
  }

  reveal (cell) {
    if (cell.isRevealed) {
      return PlayResult.nothing
    }

    this.revealedCount++
    if (cell.isFlagged) {
      this.flagCount--
    }

    cell.reveal()
    if (cell.containsBomb) {
      return PlayResult.lost
    }

    if (cell.nearBombCount === 0) {
      let neighbours = this._neighbourCells(cell.row, cell.column)
      for (const neighbour of neighbours) {
        this.reveal(neighbour)
      }
    }

    return this.winCondition()
  }

  revealAll () {
    for (const row of this.cells) {
      for (const cell of row) {
        cell.reveal()
      }
    }
  }

  winCondition () {
    if (this.revealedCount + this.flagCount === this.width * this.height) {
      return PlayResult.won
    } else {
      return PlayResult.nothing
    }
  }

  _neighbourCells (row, column) {
    let neighbours = []
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (this.cells[row + i]) {
          let cell = this.cells[row + i][column + j]
          if (cell && !(i === 0 && j === 0)) {
            neighbours.push(cell)
          }
        }
      }
    }
    return neighbours
  }
}
