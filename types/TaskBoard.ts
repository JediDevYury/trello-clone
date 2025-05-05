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