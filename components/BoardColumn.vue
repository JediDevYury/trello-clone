<script setup lang="ts">
import { defineProps } from "vue"
import { useBoardStore } from '~/stores/boardStore'
import type {TaskBoard} from "~/types/TaskBoard";

const props = defineProps<{
  column: TaskBoard['columns'][number]
  columnIndex: number
}>()

const boardStore = useBoardStore()
const router = useRouter()

const editNameState = ref(false)
const newTaskName = ref('')

//delete column
function deleteColumn(columnIndex: number) {
  boardStore.deleteColumn(columnIndex)
}

//go to task
function goToTask(taskId: string) {
  router.push(`/tasks/${taskId}`)
}
//create task
function createTask() {
  boardStore.addTask({
    name: newTaskName.value,
    columnIndex: props.columnIndex, 
  })
  newTaskName.value = ''
}
</script>

<template>
  <UContainer class="column">
    <div class="column-header mb-4">
      <div>
        <UInput v-if="editNameState" v-model="column.name" type="text"  />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton
            icon="i-heroicons-pencil-square"
            class="mr-2"
            @click="editNameState = !editNameState"
        />
        <UButton
            icon="i-heroicons-trash"
            color="red"
            @click="deleteColumn(columnIndex)"
        />
      </div>
    </div>
    <ul>
      <li v-for="task in column.tasks" :key="task.id">
        <UCard class="mb-4" @click="goToTask(task.id)">
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput 
      v-model="newTaskName"
      type="text" 
      placeholder="Create a new task" 
      icon="i-heroicons-plus-circle-solid"
      @keyup.enter="createTask"
    />
  </UContainer>
</template>