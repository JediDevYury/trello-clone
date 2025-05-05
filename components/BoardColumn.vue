<template>
  <div class="bg-gray-100 rounded-lg p-4 w-80">
    <h2 class="font-bold text-xl mb-4">{{ column.name }}</h2>
    <div class="space-y-2">
      <TaskItem 
        v-for="task in column.tasks" 
        :key="task.id" 
        :task="task" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskBoard } from '~/store/boardStore';

type Column = TaskBoard['columns'][0];

defineProps<{
  column: Column
}>();
</script> 