<script setup lang="ts">
import { defineProps } from "vue"
import { useBoardStore } from '~/stores/boardStore'
import type {TaskBoard} from "~/types/TaskBoard";
import {DraggableElement} from "~/enums/DraggableElement";

type DropItemParams = {
  toColumnIndex: number;
  toTaskIndex?: number;
}

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

function pickupColumn(event: DragEvent, fromColumnIndex: number) {
  if(event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData("type", "column")
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
  }
}

//pick up task
function pickUpTask(event: DragEvent, {
  fromTaskIndex,
  fromColumnIndex,
}: PickUpTaskParams) {
  console.log({
    fromTaskIndex,
    fromColumnIndex,
  })
  if(event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData("type", "task")
    event.dataTransfer.setData('from-task-index', fromTaskIndex.toString())
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
  }
}

//drop task
function dropItem(event: DragEvent, {toColumnIndex, toTaskIndex}: DropItemParams) {
  const type = event.dataTransfer?.getData('type') as DraggableElement
  const columnIndex = event.dataTransfer?.getData('from-column-index')

  switch (type) {
    case DraggableElement.TASK: {
      const fromTaskIndex = event.dataTransfer?.getData('from-task-index')

      if(columnIndex && fromTaskIndex) {
        boardStore.moveTask({
          fromTaskIndex: Number.parseInt(fromTaskIndex),
          toTaskIndex: toTaskIndex ?? 0,
          fromColumnIndex: Number.parseInt(columnIndex),
          toColumnIndex,
        })
      }
      break;
    }
    case DraggableElement.COLUMN: {
      if(!columnIndex) return;
      boardStore.moveColumn({
        fromColumnIndex: Number.parseInt(columnIndex),
        toColumnIndex,
      })

      break;
    }

    default: {
      return;
    }
  }
}
</script>

<template>
  <UContainer
    class="column" 
    @dragenter.prevent 
    @dragover.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
    @drop.stop="dropItem($event, {
      toColumnIndex: columnIndex,
    })"
    draggable="true"
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
          @drop.stop="dropItem($event, {
            toColumnIndex: columnIndex,
            toTaskIndex: tastIndex,
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