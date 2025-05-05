<script setup lang="ts">
import { useBoardStore } from '~/store/boardStore'

const boardStore = useBoardStore()
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Trello Clone</h1>
    <pre>{{ boardStore.board }}</pre>
  </main>
</template>