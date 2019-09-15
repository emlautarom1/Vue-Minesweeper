<template>
  <div class="board">
    <table>
      <tr class="row" v-for="(row, i) in board.cells" :key="i">
        <td
          v-for="(cell, j) in row"
          @click="onCellClick(cell)"
          @contextmenu.prevent="onCellFlag(cell)"
          :key="j"
        >
          <BoardCell :cell="cell" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'

import { Board, PlayResult } from '../models/Board'
import BoardCell from './BoardCell'

export default Vue.extend({
  name: 'GameBoard',
  components: {
    BoardCell
  },
  data () {
    return {
      board: null
    }
  },
  created () {
    this.newGame()
  },
  methods: {
    onCellClick (cell) {
      const play = this.board.reveal(cell)
      this.handlePlay(play)
    },
    onCellFlag (cell) {
      const play = this.board.flag(cell)
      this.handlePlay(play)
    },
    handlePlay (play) {
      switch (play) {
        case PlayResult.play:
          break
        case PlayResult.won:
          this.board.revealAll()
          alert('You won!')
          break
        case PlayResult.lost:
          this.board.revealAll()
          alert('You lost!')
          break
      }
    },
    newGame () {
      this.board = new Board(10, 10, 10)
    }
  }
})
</script>

<style scoped>
table {
  border: solid 2px black;
  border-collapse: collapse;
  margin: 20px 0;
}

td,
tr {
  margin: 0;
  padding: 0;
}
</style>
