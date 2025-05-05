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
type PickUpTaskParams = {
  fromTaskIndex: number;
  fromColumnIndex: number;
};

//pick up task
function pickUpTask(event: DragEvent, {
  fromTaskIndex,
  fromColumnIndex,
}: PickUpTaskParams) {
  if(event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('from-task-index', fromTaskIndex.toString())
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
  }
}

//drop task
function dropTask(event: DragEvent, toColumnIndex: number) {
  const columnIndex = event.dataTransfer?.getData('from-column-index')
  const taskIndex = event.dataTransfer?.getData('from-task-index')

  if(columnIndex && taskIndex) {
    boardStore.moveTask({
      taskIndex: Number.parseInt(taskIndex),
      columnIndex: Number.parseInt(columnIndex),
      toColumnIndex,
    })
  }
}
</script>

<template>
  <UContainer 
    class="column" 
    @dragenter.prevent 
    @dragover.prevent 
    @drop.stop="dropTask($event, columnIndex)"
  >
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
      <li v-for="(task, tastIndex) in column.tasks" :key="task.id">
        <UCard class="mb-4" 
          draggable="true"
          @click="goToTask(task.id)" 
          @dragstart="pickUpTask($event, {
            fromTaskIndex: tastIndex,
            fromColumnIndex: columnIndex,
          })"
        >
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