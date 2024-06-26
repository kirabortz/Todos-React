import {
  asyncThunkCreator,
  buildCreateSlice,
  current,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { todolistsApi } from 'features/todolistsList/api/todolistsApi'

import { UpdatedItemProps, updateTodolistModel } from 'features/todolistsList/lib/updateItemModel'
import { RootState } from 'app/model/Store'
import { fetchTasks } from 'features/todolistsList/model/tasksSlice'
import { ResultCode, TaskStatuses } from 'common/enums/enums'
import { FilterValuesType, RequestStatusType, ResponseProps } from 'common/types/types'
import { TodolistProps } from 'features/todolistsList/ui/todolist/todolist.types'

export type TodolistsDomainProps = TodolistProps & {
  filter: FilterValuesType
  entityStatus: RequestStatusType | boolean
  showTasks?: boolean
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: 'todolistsReducer',
  initialState: {
    todolists: [] as TodolistsDomainProps[],
    filteredTodos: [] as TodolistsDomainProps[],
    currentPage: 1,
    pageSize: 4,
  },
  reducers: creators => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: ResponseProps | null }>()
    return {
      fetchTodolists: createAThunk<{ todolists: TodolistProps[] }, undefined>(
        async (_, { dispatch }) => {
          const responseTodos = await todolistsApi.getTodolist()
          await Promise.all(
            responseTodos.data.map(async todoList => {
              await dispatch(fetchTasks({ todoListId: todoList.id }))
            })
          )
          const todolists = responseTodos.data

          return { todolists }
        },
        {
          fulfilled: (state, action: PayloadAction<{ todolists: TodolistProps[] }>) => {
            action.payload.todolists.map(todolist => {
              state.todolists.push({ ...todolist, filter: 'all', entityStatus: 'idle' })
            })
          },
        }
      ),
      addTodolist: createAThunk<{ todolist: TodolistProps }, { title: string }>(
        async ({ title }, { rejectWithValue }) => {
          const res = await todolistsApi.addTodolist(title)

          if (res.data.resultCode === ResultCode.success) {
            const todolist = res.data.data.item
            return { todolist }
          } else {
            return rejectWithValue(res.data)
          }
        },
        {
          fulfilled: (state, action: PayloadAction<{ todolist: TodolistProps }>) => {
            state.todolists.unshift({
              ...action.payload.todolist,
              filter: 'all',
              entityStatus: 'idle',
            })
          },
        }
      ),

      /**
       * @param {updateTodolist} - for title and filter update
       */
      updateTodolist: createAThunk<
        { updatedTodolist: TodolistProps },
        { todoListId: string; updatedParam: UpdatedItemProps }
      >(
        async ({ todoListId, updatedParam }, { rejectWithValue, getState }) => {
          const state = (getState() as RootState).todolistsReducer.todolists
          const todolist = state.find(tl => tl.id === todoListId)
          if (todolist) {
            const updatedTodolist = updateTodolistModel(todolist, updatedParam)
            const res = await todolistsApi
              .updateTodolist(todoListId, updatedTodolist)
              .finally(() => {})

            if (res.data.resultCode === ResultCode.success) {
              return { updatedTodolist }
            } else {
              return rejectWithValue(res.data)
            }
          } else {
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action: PayloadAction<{ updatedTodolist: TodolistProps }>) => {
            const index = state.todolists.findIndex(
              todolist => todolist.id === action.payload.updatedTodolist.id
            )
            if (index !== -1)
              state.todolists[index] = {
                ...state.todolists[index],
                ...action.payload.updatedTodolist,
              }
          },
        }
      ),

      deleteTodolist: createAThunk<{ todoListId: string }, { todoListId: string }>(
        async ({ todoListId }, { rejectWithValue }) => {
          const res = await todolistsApi.deleteTodolist(todoListId)
          if (res.data.resultCode === ResultCode.success) {
            return { todoListId }
          } else {
            return rejectWithValue(res.data)
          }
        },
        {
          fulfilled: (state, action: PayloadAction<{ todoListId: string }>) => {
            const index = state.todolists.findIndex(
              todolist => todolist.id === action.payload.todoListId
            )
            if (index !== -1) state.todolists.splice(index, 1)
          },
        }
      ),

      reorderTodolist: creators.reducer(
        (
          state,
          action: PayloadAction<{
            startDragId: string
            endShiftId: string | null
          }>
        ) => {
          const { startDragId, endShiftId } = action.payload
          const dragIndex = state.todolists.findIndex(el => el.id === startDragId)
          const targetIndex = state.todolists.findIndex(el => el.id === endShiftId)

          if (dragIndex > -1 && targetIndex > -1) {
            const draggedItem = state.todolists.splice(dragIndex, 1)[0]
            state.todolists.splice(targetIndex, 0, draggedItem)
          }
        }
      ),

      resetTodosAndTasksData: creators.reducer(state => {
        state.todolists = []
      }),
      updateFilteredTodos: creators.reducer(
        (state, action: PayloadAction<{ filteredTodos: TodolistsDomainProps[] }>) => {
          state.filteredTodos = action.payload.filteredTodos
        }
      ),
      updateCurrentPage: creators.reducer(
        (state, action: PayloadAction<{ currentPage: number }>) => {
          state.currentPage = action.payload.currentPage
        }
      ),
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPending(updateTodolist, deleteTodolist), (state, action) => {
        const index = state.todolists.findIndex(
          todolist => todolist.id === action.meta.arg.todoListId
        )
        if (index !== -1) state.todolists[index].entityStatus = 'loading'
      })
      .addMatcher(isFulfilled(updateTodolist, deleteTodolist), (state, action) => {
        const index = state.todolists.findIndex(
          todolist => todolist.id === action.meta.arg.todoListId
        )
        if (index !== -1) state.todolists[index].entityStatus = 'succeeded'
      })
      .addMatcher(isRejected(updateTodolist, deleteTodolist), (state, action) => {
        const index = state.todolists.findIndex(
          todolist => todolist.id === action.meta.arg.todoListId
        )
        if (index !== -1) state.todolists[index].entityStatus = 'failed'
      })
  },
  selectors: {
    selectTodolists: state => state.todolists,
    selectGetFilteredTodolists: state => {
      if (state.filteredTodos.length === 0) {
        return state.todolists
      } else {
        let idArr = state.filteredTodos.map(todo => todo.id)
        return state.todolists.filter(todo => idArr.includes(todo.id))
      }
    },
    selectCurrentPage: state => state.currentPage,
    selectPageSize: state => state.pageSize,
  },
})

export const todolistsReducer = slice.reducer
export const {
  updateFilteredTodos,
  fetchTodolists,
  addTodolist,
  reorderTodolist,
  updateTodolist,
  deleteTodolist,

  resetTodosAndTasksData,
  updateCurrentPage,
} = slice.actions
export const todolistsThunks = {
  fetchTodolists,
  addTodolist,
  reorderTodolist,
  updateTodolist,
  deleteTodolist,
  resetTodosAndTasksData,
  updateFilteredTodos,
  updateCurrentPage,
}
export const todolistsSelectors = slice.selectors
