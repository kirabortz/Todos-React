import { createSlice } from '@reduxjs/toolkit'
import { TodolistsDomainProps } from 'features/todolistsList/model/todolistsSlice'
import { TasksDomainProps } from 'features/todolistsList/model/tasksSlice'
import { TaskProps } from 'features/todolistsList/ui/tasks/tasks.types'

type initStateType = {
  activeTodo: TodolistsDomainProps | null
  activeTask: TasksDomainProps | null
  memoActiveTodoId: string | null
  memoOverTodoId: string | null
  memoActiveTaskCopy: TaskProps | null | undefined
}

const slice = createSlice({
  name: 'dnd',
  initialState: {
    activeTodo: null,
    activeTask: null,
    memoActiveTodoId: null,
    memoOverTodoId: null,
    memoActiveTaskCopy: null,
  } as initStateType,
  reducers: {
    setActiveTodo: (state, action) => {
      state.activeTodo = action.payload
    },
    setActiveTask: (state, action) => {
      state.activeTask = action.payload
    },
    setMemoActiveTodoId: (state, action) => {
      state.memoActiveTodoId = action.payload
    },
    setMemoOverTodoId: (state, action) => {
      state.memoOverTodoId = action.payload
    },
    setMemoActiveTaskCopy: (state, action) => {
      state.memoActiveTaskCopy = action.payload
    },
  },
  selectors: {
    activeTodo: sliceState => sliceState.activeTodo,
    activeTask: sliceState => sliceState.activeTask,
    memoActiveTodoId: sliceState => sliceState.memoActiveTodoId,
    memoOverTodoId: sliceState => sliceState.memoOverTodoId,
    memoActiveTaskCopy: sliceState => sliceState.memoActiveTaskCopy,
  },
})

export const dndSlice = slice.reducer
export const dndActions = slice.actions
export const dndSelectors = slice.selectors
