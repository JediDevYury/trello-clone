<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()
const route = useRoute()
const router = useRouter()

const task = computed(() => {
  if(typeof route.params.id !== 'string') return;
  return boardStore.getTask(route.params.id)
})

function deleteTask() {
  const isTaskId = !!route.params.id && typeof route.params.id === 'string'

  if(isTaskId) {
    const success = boardStore.deleteTask(route.params.id as string)

    if(success) {
      router.push('/')
    }
  }
}

</script>

<template>
  <div class="task-wrapper">
    <div v-if="task" class="task-view">
      <UFormGroup label="Name" class="w-full mb-4">
        <UInput type="text" v-model="task.name" />
      </UFormGroup>
      <UFormGroup label="Description" class="w-full mb-4">
        <UTextarea v-model="task.description" />
      </UFormGroup>
      <UButton icon="i-heroicons-trash" color="red" @click="deleteTask">
        Delete task
      </UButton>
    </div>
    <div v-else>
      <p class="mx-auto">Task not found.</p>
    </div>
  </div>
</template>