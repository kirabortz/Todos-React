import { TodolistsDomainProps } from "features/todolistsList/model/todolistsSlice"
import { UpdateTaskModelProps } from "features/todolistsList/ui/tasks/tasks.types"

export type UpdatedItemProps = Record<string, string | number>

export const updateTodolistModel = (todolist: TodolistsDomainProps, updatedParam: UpdatedItemProps) => {
  return {
    id: todolist.id,
    addedDate: todolist.addedDate,
    order: todolist.order,
    title: todolist.title,
    filter: todolist.filter,
    entityStatus: "succeeded",
    ...updatedParam,
  }
}

export const updateTaskModel = (task: UpdateTaskModelProps, updatedParam: UpdatedItemProps) => {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    entityStatus: task.entityStatus,
    ...updatedParam,
  }
}
