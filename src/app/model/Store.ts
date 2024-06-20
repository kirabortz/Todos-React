import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from 'app/model/appSlice'
import { todolistsReducer } from 'features/todolistsList/model/todolistsSlice'
import { tasksReducer } from 'features/todolistsList/model/tasksSlice'
import { authReducer, initializeApp } from 'features/auth/model/authSlice'
import { dndSlice } from 'features/todolistsList/dnd/dndSlice'
import { dndTasksReducer } from 'features/todolistsList/dnd/dndTasksSlice'
import { dndTodolistsSlice } from 'features/todolistsList/dnd/dndTodolistsSlice'

export const store = configureStore({
  reducer: {
    todolistsReducer,
    tasksReducer,
    appReducer,
    authReducer,
    dnd: dndSlice,
    dndTasks: dndTasksReducer,
    dndTodolists: dndTodolistsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

store.dispatch(initializeApp())
