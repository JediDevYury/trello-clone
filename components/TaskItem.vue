<template>
  <div class="bg-white p-3 rounded shadow">
    <h3 class="font-semibold">{{ task.name }}</h3>
    <p v-if="task.description" class="text-sm text-gray-600 mt-1">
      {{ task.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: string;
  name: string;
  description: string;
}

defineProps<{
  task: Task
}>();
</script> 