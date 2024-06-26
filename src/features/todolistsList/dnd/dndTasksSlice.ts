import { TasksApi } from 'features/todolistsList/api/tasksApi'
import { createSlice } from '@reduxjs/toolkit'
import {
  dndIdChangerForTaskAcrossTodos,
  dndUniversalIdChanger,
} from 'features/todolistsList/dnd/dragAndDropIdChangerFunctions'
import { createAppAsyncThunk } from 'features/todolistsList/dnd/createAppAsyncThunk'
import { TaskProps, UpdateTaskModelProps } from 'features/todolistsList/ui/tasks/tasks.types'

const slice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {},
})

const addTaskDnDTC = createAppAsyncThunk<
  {
    task: TaskProps
  },
  {
    todoListId: string
    title: string
  }
>(`${slice.name}/addTaskDnDTC`, async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  //@ts-ignore
  const res = await TasksApi.addTask(arg.todoListId, arg.title)
  if (res.data.resultCode === 0) {
    const task = res.data.data.item
    return { task }
  } else {
    return rejectWithValue(null)
  }
})

const updateTaskDnDTC = createAppAsyncThunk<
  any,
  {
    todoListId: string
    task: TaskProps
    model: Partial<UpdateTaskModelProps>
  }
>(`${slice.name}/updateTask`, async (args, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  if (!args.task) {
    throw new Error('Task not found in the state')
  }

  const apiModel = { ...args.task, ...args.model }
  try {
    const res = await TasksApi.updateTask(args.todoListId, args.task.id, apiModel)
    if (res.data.resultCode === 0) {
      return {
        todoListId: args.todoListId,
        taskId: args.task.id,
        model: apiModel,
      }
    } else {
      return rejectWithValue(null)
    }
  } catch (e) {}
})

const reorderTaskTC = createAppAsyncThunk<
  undefined,
  {
    todoListId: string
    startDragId: string
    endShiftId: string | null
  }
>(`${slice.name}/reorderTasksSoloTodoDnDTC`, async (args, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI

  const tasks = getState().tasksReducer.tasks[args.todoListId]
  const idToServer = dndUniversalIdChanger(tasks, args)
  const res = await TasksApi.reorderTasks({
    todoListId: args.todoListId,
    startDragId: args.startDragId,
    endShiftId: idToServer,
  })
  if (res.data.resultCode === 0) {
    return undefined
  } else {
    return rejectWithValue(null)
  }
})

const reorderTaskAcrossTodosTC = createAppAsyncThunk<
  undefined,
  {
    todoListId: string
    startDragId: string
    endShiftId: string
  }
>(`${slice.name}/reorderTasksDnDByOrderTC`, async (args, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI
  const tasks = getState().tasksReducer.tasks[args.todoListId]
  const idToServer = dndIdChangerForTaskAcrossTodos({
    tasks,
    endShiftId: args.endShiftId,
  })
  const res = await TasksApi.reorderTasks({
    todoListId: args.todoListId,
    startDragId: args.startDragId,
    endShiftId: idToServer,
  })
  if (res.data.resultCode === 0) {
    return undefined
  } else {
    return rejectWithValue(null)
  }
})
export const dndTasksReducer = slice.reducer

export const dndTasksActions = slice.actions

export const dndTasksThunks = {
  updateTaskDnDTC,
  reorderTaskTC,
  addTaskDnDTC,
  reorderTaskAcrossTodosTC,
}
