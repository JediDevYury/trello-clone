import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { useAsyncData } from '#app'
import boardData from '~/content/taskboards/task-board.json'

export interface TaskBoard {
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: Array<{
      id: string
      name: string
      description: string
    }>
  }>
}

// interface ApiResponse {
//   success: boolean;
//   message: string;
// }

export const useBoardStore = defineStore('boardStore', () => {

  const board = ref<TaskBoard>(boardData)

  return {
    board
  }
})