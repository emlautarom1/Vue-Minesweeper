export class Cell {
  constructor (hasBomb = false, row, column) {
    this.row = row
    this.column = column
    this.containsBomb = hasBomb
    this.isFlagged = false
    this.isRevealed = false
    this.nearBombCount = 0
  }

  switchFlag () {
    this.isFlagged = !this.isFlagged
  }

  reveal () {
    this.isRevealed = true
  }
}
