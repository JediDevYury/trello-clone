<script setup lang="ts">
import { useBoardStore } from '~/store/boardStore'
import { ref } from 'vue'

const boardStore = useBoardStore()
const newColumnName = ref('')
function addColumn() {
  boardStore.addColumn(newColumnName.value)
  newColumnName.value = ''
}
</script>

<template>
    <div class="board-wrapper">
      <div class="board">
        <UContainer class="column">
          <UInput
              type="text"
              v-model="newColumnName"
              placeholder="Create a new column"
              icon="i-heroicons-plus-circle-solid"
              @keyup.enter="addColumn"
          />
        </UContainer>
        <BoardColumn
            v-for="(column, columnIndex) in boardStore.board.columns"
            :key="column.id"
            :column="column"
            :columnIndex="columnIndex"
        />
    </div>
  </div>
</template>