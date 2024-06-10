import { TasksApi } from "features/todolistsList/api/tasksApi"
import { RootState } from "app/model/Store"

import { updateTaskModel } from "features/todolistsList/lib/updateItemModel"
import {
  asyncThunkCreator,
  buildCreateSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit"
import { addTodolist, resetTodosAndTasksData } from "features/todolistsList/model/todolistsSlice"
import { ResultCode, TaskStatuses } from "common/enums/enums"

import { RequestStatusType, ResponseProps } from "common/types/types"
import { TaskProps, UpdateTaskModelProps } from "features/todolistsList/ui/tasks/tasks.types"

export type TasksDomainProps = TaskProps & {
  entityStatus: RequestStatusType
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "tasksReducer",
  initialState: {
    tasks: {} as Record<string, TasksDomainProps[]>,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: ResponseProps | null }>()
    return {
      fetchTasks: createAThunk<{ todoListId: string; tasks: TaskProps[] }, { todoListId: string }>(
        async ({ todoListId }) => {
          const res = await TasksApi.getTasks(todoListId)

          const tasks = res.data.items

          return { todoListId: todoListId, tasks }
        },
        {
          fulfilled: (state, action: PayloadAction<{ todoListId: string; tasks: TaskProps[] }>) => {
            state.tasks[action.payload.todoListId] = action.payload.tasks.map((task) => ({
              ...task,
              entityStatus: "idle",
            }))
          },
        },
      ),

      addTask: createAThunk<{ task: TaskProps }, { todoListId: string; title: string }>(
        async ({ todoListId, title }, { rejectWithValue }) => {
          const res = await TasksApi.addTask(todoListId, title)
          if (res.data.resultCode === ResultCode.success) {
            const task = res.data.data.item
            return { task }
          } else {
            return rejectWithValue(res.data)
          }
        },
        {
          fulfilled: (state, action: PayloadAction<{ task: TaskProps }>) => {
            state.tasks[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" })
          },
        },
      ),

      updateTask: createAThunk<{ task: TaskProps }, { todoListId:string, taskId:string, updatedParam:any }>(
        async ({ todoListId, taskId, updatedParam }, { rejectWithValue, getState }) => {
          const state = (getState() as RootState).tasksReducer.tasks[todoListId]
          const task = state.find((task) => task.id === taskId)
          if (task) {
            const updatedTask: UpdateTaskModelProps = updateTaskModel(task, updatedParam)
            const res = await TasksApi.updateTask(todoListId, taskId, updatedTask)

            if (res.data.resultCode === 0) {
              const task = res.data.data.item

              return { task }
            } else {
              return rejectWithValue(res.data)
            }
          } else {
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action: PayloadAction<{ task: TaskProps }>) => {
            const index = state.tasks[action.payload.task.todoListId].findIndex(
              (task) => task.id === action.payload.task.id,
            )

            const taskListId = action.payload.task.todoListId
            if (index !== -1) {
              state.tasks[taskListId][index] = {
                ...state.tasks[taskListId][index],
                ...action.payload.task,
              }
            }
          },
        },
      ),
      deleteTask: createAThunk<{ todoListId: string; taskId: string }, { todoListId: string; taskId: string }>(
        async ({ todoListId, taskId }, { rejectWithValue }) => {
          let res = await TasksApi.deleteTask(todoListId, taskId)
          if (res.data.resultCode === ResultCode.success) {
            return { todoListId, taskId }
          } else {
            return rejectWithValue(res.data)
          }
        },
        {
          fulfilled: (state, action: PayloadAction<{ todoListId: string; taskId: string }>) => {
            const index = state.tasks[action.payload.todoListId].findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) state.tasks[action.payload.todoListId].splice(index, 1)
          },
        },
      ),

      reorderedTask: createAThunk<
        {
          todoListId: string
          taskId: string
          endListId: string
          startIndex: number
          endIndex: number
        },
        { todoListId: string; taskId: string; endListId: string; startIndex: number; endIndex: number }
      >(
        async ({ todoListId, taskId, endListId, startIndex, endIndex }, { rejectWithValue, getState }) => {
          const state = getState() as RootState
          const endId = state.tasksReducer.tasks[todoListId][endIndex].id
          const res = await TasksApi.dragDropTask(todoListId, taskId, endId)

          if (res.data.resultCode === ResultCode.success) {
            return { todoListId, taskId, endListId, startIndex, endIndex }
          } else {
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (
            state,
            action: PayloadAction<{
              todoListId: string
              taskId: string
              endListId: string
              startIndex: number
              endIndex: number
            }>,
          ) => {
            const newSourceTasks = [...state.tasks[action.payload.todoListId]]

            const newDestinationTasks =
              action.payload.todoListId !== action.payload.endListId
                ? [...state.tasks[action.payload.endListId]]
                : newSourceTasks

            const [removedTask] = newSourceTasks.splice(action.payload.startIndex, 1)

            removedTask.todoListId = action.payload.endListId

            newDestinationTasks.splice(action.payload.endIndex, 0, removedTask)

            if (action.payload.todoListId === action.payload.endListId) {
              state.tasks[action.payload.todoListId] = newSourceTasks
            }
            state.tasks[action.payload.endListId] = newDestinationTasks
          },
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetTodosAndTasksData, (state) => {
        state.tasks = {}
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.tasks[action.payload.todolist.id] = []
      })
      .addMatcher(isPending(updateTask, deleteTask), (state, action) => {
        const index = state.tasks[action.meta.arg.todoListId].findIndex((task) => task.id === action.meta.arg.taskId)
        if (index !== -1) {
          state.tasks[action.meta.arg.todoListId][index].entityStatus = "loading"
        }
      })
      .addMatcher(isFulfilled(updateTask, deleteTask), (state, action) => {
        const index = state.tasks[action.meta.arg.todoListId].findIndex((task) => task.id === action.meta.arg.taskId)
        if (index !== -1) {
          state.tasks[action.meta.arg.todoListId][index].entityStatus = "succeeded"
        }
      })
      .addMatcher(isRejected(updateTask, deleteTask), (state, action) => {
        const index = state.tasks[action.meta.arg.todoListId].findIndex((task) => task.id === action.meta.arg.taskId)
        if (index !== -1) {
          state.tasks[action.meta.arg.todoListId][index].entityStatus = "failed"
        }
      })
  },
  selectors: {
    selectFilteredTasks: (state, todoListId, filter) => {
      switch (filter) {
        case "active":
          return state.tasks[todoListId].filter((task) => task.status === TaskStatuses.New)
        case "completed":
          return state.tasks[todoListId].filter((task) => task.status === TaskStatuses.Completed)
        default:
          return state.tasks[todoListId]
      }
    },
  },
})

export const tasksReducer = slice.reducer
export const { fetchTasks, addTask, updateTask, deleteTask, reorderedTask } = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, deleteTask, reorderedTask }
export const tasksSelectors = slice.selectors
