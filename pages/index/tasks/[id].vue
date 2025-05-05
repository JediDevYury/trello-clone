<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()
const route = useRoute()

const task = computed(() => {
  if(typeof route.params.id !== 'string') return;
  return boardStore.getTask(route.params.id)
})

</script>

<template>
  <div class="task-wrapper">
    <div class="task-view">
      <h1>{{ task.name }}</h1>
      <p>{{ task.description }}</p>
    </div>
  </div>
</template>