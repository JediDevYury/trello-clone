import { defineStore } from 'pinia'
import {useStorage} from "@vueuse/core";
// import { ref } from 'vue'
// import { useAsyncData } from '#app'
import boardData from '~/content/taskboards/task-board.json'
import {useId} from 'vue'
// interface ApiResponse {
//   success: boolean;
//   message: string;
// }

export const useBoardStore = defineStore('boardStore', () => {

  const board = useStorage<TaskBoard>("board", boardData)

  //getters
  const getTask = computed(() => {
    return (taskId:string) => {
      for (const column of board.value.columns) {
        const task = column.tasks?.find(task => task.id === taskId)
        if(task) return task
      }
    }
  })

  //actions
  function addColumn(columnName: string) {
    board.value.columns.push({
      id: useId(),
      name: columnName,
      tasks: []
    })
  }
  function deleteColumn(columnIndex: number) {
    board.value.columns.splice(columnIndex, 1)
  }

  return {
    board,

    getTask,

    addColumn,
    deleteColumn,
  }
})