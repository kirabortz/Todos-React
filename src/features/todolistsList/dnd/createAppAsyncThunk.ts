import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/model/Store'
import { ResponseProps } from 'common/types/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: ResponseProps | null
}>()
