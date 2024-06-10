import { TaskPriorities, TaskStatuses } from "common/enums/enums"
import { RequestStatusType } from "common/types/types"

export type TaskProps = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelProps = Partial<Omit<TaskProps, "id" | "todoListId" | "order" | "addedDate">> & {
  entityStatus?: RequestStatusType
}

export type TasksResponseProps = {
  error: string | null
  totalCount: number
  items: TaskProps[]
}
