import { defineStore } from 'pinia'
import {useStorage} from "@vueuse/core";
// import { ref } from 'vue'
// import { useAsyncData } from '#app'
import boardData from '~/content/taskboards/task-board.json'
import {useId} from 'vue'

export interface TaskBoard {
  name: string
  columns: Array<{
    id: string
    name: string
    tasks?: Array<{
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

  const board = useStorage<TaskBoard>("board", boardData)

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
    addColumn,
    deleteColumn
  }
})