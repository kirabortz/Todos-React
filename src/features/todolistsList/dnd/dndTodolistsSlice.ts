import { createSlice } from '@reduxjs/toolkit'
import { TodolistsDomainProps } from 'features/todolistsList/model/todolistsSlice'
import { createAppAsyncThunk } from 'features/todolistsList/dnd/createAppAsyncThunk'
import { dndUniversalIdChanger } from 'features/todolistsList/dnd/dragAndDropIdChangerFunctions'
import { todolistsApi } from 'features/todolistsList/api/todolistsApi'

const slice = createSlice({
  name: 'dndTodolists',
  initialState: {
    todolists: [] as TodolistsDomainProps[],
    filteredTodos: [] as TodolistsDomainProps[],
    currentPage: 1,
    pageSize: 4,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(reorderTodolistTC.fulfilled, (state, action) => {
      const { startDragId, endShiftId } = action.payload
      const dragIndex = state.todolists.findIndex(el => el.id === startDragId)
      const targetIndex = state.todolists.findIndex(el => el.id === endShiftId)

      if (dragIndex > -1 && targetIndex > -1) {
        const draggedItem = state.todolists.splice(dragIndex, 1)[0]
        state.todolists.splice(targetIndex, 0, draggedItem)
      }
    })
  },
})

const reorderTodolistTC = createAppAsyncThunk<
  {
    startDragId: string
    endShiftId: string | null
  },
  {
    startDragId: string
    endShiftId: string | null
  }
>(`${slice.name}/reorderTodolist`, async (args, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI
  const todolists = getState().todolistsReducer.todolists
  const idToServer = dndUniversalIdChanger(todolists, args)
  try {
    const res = await todolistsApi.reorderTodolist({
      startDragId: args.startDragId,
      endShiftId: idToServer,
    })
    if (res.data.resultCode === 0) {
      return args
    } else {
      return rejectWithValue(null)
    }
  } finally {
  }
})

export const dndTodolistsSlice = slice.reducer
export const dndTodolistsActions = slice.actions
export const dndTodolistsThunks = {
  reorderTodolistTC,
}
