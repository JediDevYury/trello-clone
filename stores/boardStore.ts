import { defineStore } from 'pinia'
import {useStorage} from "@vueuse/core";
import boardData from '~/content/taskboards/task-board.json'
import type { TaskBoard } from '~/types/TaskBoard'
import { v4 } from 'uuid';

interface AddTaskProps {
  name: string
  columnIndex: number
}

export interface MoveTaskParams {
  taskIndex: number
  columnIndex: number
  toColumnIndex: number
}

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

  //add task

  function moveTask({
    taskIndex,
    columnIndex,
    toColumnIndex,
  }: MoveTaskParams) {
    const task = board.value.columns[columnIndex].tasks?.splice(taskIndex, 1)[0]

    if(task) {
      board.value.columns[toColumnIndex].tasks?.push(task)
    }
  }

  function addTask({
    name,
    columnIndex,
  }: AddTaskProps) {
    const id = v4()

    const task = {
      id,
      name,
      description: '',
    }
    board.value.columns[columnIndex].tasks?.push(task)
  }
  //delete task
  function deleteTask(taskId: string) {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks?.findIndex(task => task.id === taskId)

      const isTaskIndexValid = taskIndex !== -1 && taskIndex !== undefined;

      if(isTaskIndexValid) {
        column.tasks?.splice(taskIndex, 1)
        return true
      }
    }
    return false
  }
  //add column
  function addColumn(columnName: string) {
    board.value.columns.push({
      id: v4(),
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

    //task
    addTask,
    deleteTask,
    moveTask,
    
    //column
    addColumn,
    deleteColumn,
  }
})