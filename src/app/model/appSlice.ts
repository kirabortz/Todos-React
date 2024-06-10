import {
  asyncThunkCreator,
  buildCreateSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from "@reduxjs/toolkit"
import { NetworkErrorType, RequestStatusType } from "common/types/types"
import { todolistsThunks } from "features/todolistsList/model/todolistsSlice"
import { authThunks } from "features/auth/model/authSlice"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"

export type appDomainProps = {
  status: RequestStatusType
  error: NetworkErrorType
  isInitialized: boolean
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "appReducer",
  initialState: {
    status: "loading",
    error: null,
    isInitialized: false,
  } as appDomainProps,
  reducers: (creators) => {
    return {
      setAppStatus: creators.reducer((state, action: PayloadAction<{ status: RequestStatusType }>) => {
        state.status = action.payload.status
      }),

      setAppError: creators.reducer((state, action: PayloadAction<{ error: NetworkErrorType }>) => {
        state.error = action.payload.error
      }),
      isInitialized: creators.reducer((state, action: PayloadAction<{ isInitialized: boolean }>) => {
        state.isInitialized = action.payload.isInitialized
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed"
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.initializeApp.rejected.type
          )
            return
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred"
        }
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state) => {
        state.isInitialized = true
      })
  },
  selectors: {
    selectAppInitialized: (state) => state.isInitialized,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
  },
})

export const appReducer = slice.reducer
export const { isInitialized, setAppError, setAppStatus } = slice.actions
export const appActions = { isInitialized, setAppError, setAppStatus }
export const appSelectors = slice.selectors
