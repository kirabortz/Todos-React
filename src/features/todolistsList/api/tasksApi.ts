import { instance } from 'common/instance/instance'
import { ResponseProps } from 'common/types/types'
import {
  TaskProps,
  TasksResponseProps,
  UpdateTaskModelProps,
} from 'features/todolistsList/ui/tasks/tasks.types'

export const TasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponseProps>(`todo-lists/${todolistId}/tasks`)
  },
  addTask(todolistId: string, title: string) {
    return instance.post<ResponseProps<{ item: TaskProps }>>(`todo-lists/${todolistId}/tasks`, {
      title,
    })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseProps>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelProps) {
    return instance.put<ResponseProps<{ item: TaskProps }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    )
  },
  reorderTasks(args: any) {
    return instance.put(`todo-lists/${args.todoListId}/tasks/${args.startDragId}/reorder`, {
      putAfterItemId: args.endShiftId,
    })
  },
}
