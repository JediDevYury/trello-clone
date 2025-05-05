<script setup lang="ts">
import { useBoardStore } from '~/store/boardStore'

const boardStore = useBoardStore()
</script>

<template>
    <div class="board-wrapper">
      <div class="board">
      <UContainer v-for="column in boardStore.board.columns" :key="column.id" class="column" >
          <h2>{{ column.name }}</h2>
          <ul>
            <li v-for="task in column.tasks" :key="task.id">
              <UCard class="mb-4">
                <strong>{{ task.name }}</strong>
                <p>{{ task.description }}</p>
              </UCard>
            </li>
          </ul>
      </UContainer>
    </div>
  </div>
</template>