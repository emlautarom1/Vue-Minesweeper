<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <GameBoard ref="board" />
    <button @click="newGame()">New Game</button>
  </div>
</template>

<script>
import Vue from 'vue'
import GameBoard from './components/GameBoard'

export default Vue.extend({
  name: 'app',
  components: {
    GameBoard
  },
  methods: {
    newGame () {
      this.$refs.board.newGame()
    }
  }
})
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

button {
  border: solid 2px #202020;
  text-transform: uppercase;
  font-weight: bold;
  width: 200px;
  padding: 5px;
}
</style>
