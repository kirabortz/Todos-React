import { ResponseProps } from "common/types/types"
import { instance } from "common/instance/instance"
import { TodolistProps } from "features/todolistsList/ui/todolist/todolist.types"

export const todolistsApi = {
  getTodolist() {
    return instance.get<TodolistProps[]>(`todo-lists`)
  },
  addTodolist(title: string) {
    return instance.post<ResponseProps<{ item: TodolistProps }>>(`todo-lists`, { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseProps>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: any) {
    return instance.put<ResponseProps<{ item: TodolistProps }>>(`todo-lists/${todolistId}`, { title: title.title })
  },
  dragDropTodolist(todolistId: string, endId: string) {
    return instance.put(`todo-lists/${todolistId}/reorder`, { putAfterItemId: endId })
  },
}
