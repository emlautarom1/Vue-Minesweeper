<template>
  <div class="cell" :class="getCellBackgroundClass()">
    <span v-show="cell.isRevealed">
      <img class="cell-content" v-if="cell.containsBomb" src="../assets/bomb.svg" alt="B" />
      <span class="cell-content" v-else>{{ cell.nearBombCount }}</span>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell } from '../models/Cell'

export default Vue.extend({
  name: 'BoardCell',
  props: {
    cell: {
      type: Cell,
      required: true
    }
  },
  methods: {
    getCellBackgroundClass () {
      if (this.cell.isRevealed) {
        if (this.cell.containsBomb) {
          return 'with-bomb'
        }
        return 'revealed'
      } else if (this.cell.isFlagged) {
        return 'flagged'
      }
    }
  }
})
</script>

<style scoped>
.cell {
  min-height: 30px;
  min-width: 30px;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: grey;
}

.cell-content {
  max-width: 20px;
  max-height: 20px;
}

.flagged {
  background-color: green;
}

.revealed {
  background-color: lightgrey;
}

.with-bomb {
  background-color: red;
}
</style>
