import { asyncThunkCreator, buildCreateSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { AuthApi } from "features/auth/api/authApi"
import { fetchTodolists, resetTodosAndTasksData } from "features/todolistsList/model/todolistsSlice"
import { ResultCode } from "common/enums/enums"

import { ResponseProps } from "common/types/types"
import { LoginProps } from "features/auth/ui/login/login.types"

export type authDomainProps = {
  isLoggedIn: boolean
  captchaUrl: string
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "authReducer",
  initialState: {
    isLoggedIn: false,
    captchaUrl: "",
  } as authDomainProps,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: ResponseProps }>()
    return {
      getAuth: createAThunk<{ isLoggedIn: true }, undefined>(async (_, { rejectWithValue }) => {
        const res = await AuthApi.me()

        if (res.data.resultCode === ResultCode.success) {
          return { isLoggedIn: true }
        } else {
          return rejectWithValue(res.data)
        }
      }),
      login: createAThunk<{ isLoggedIn: true }, LoginProps>(async (userData, { dispatch, rejectWithValue }) => {
        const { email, password, rememberMe, captcha } = userData
        const res = await AuthApi.login(email, password, rememberMe, captcha)

        if (res.data.resultCode === ResultCode.success) {

          localStorage.setItem("sn-token", res.data.data.token);

          dispatch(fetchTodolists())

          return { isLoggedIn: true }
        } else {
          if (res.data.resultCode === ResultCode.ddos) {
            const res = await AuthApi.getCaptcha()
            dispatch(slice.actions.getSecurityUrl({ isCaptcha: res.data.url }))
          }
          return rejectWithValue(res.data)
        }
      }),
      logout: createAThunk<{ isLoggedIn: boolean }, undefined>(async (_, { dispatch, rejectWithValue }) => {
        const res = await AuthApi.logout()

        if (res.data.resultCode === ResultCode.success) {
          localStorage.removeItem('sn-token')
          dispatch(resetTodosAndTasksData())

          return { isLoggedIn: false }
        } else {
          return rejectWithValue(res.data)
        }
      }),

      getSecurityApi: createAThunk<Promise<void>, undefined>(async (_, { dispatch }) => {
        const res = await AuthApi.getCaptcha()
        dispatch(slice.actions.getSecurityUrl({ isCaptcha: res.data.url }))
      }),

      initializeApp: createAThunk<Promise<unknown>, undefined>(async (_, { dispatch, rejectWithValue }) => {
        const res = await AuthApi.me()

        if (res.data.resultCode === ResultCode.success) {
          dispatch(isLoggin({ isLoggedIn: true }))
          dispatch(fetchTodolists())
        } else {
          return rejectWithValue(res.data)
        }
      }),
      isLoggin: creators.reducer((state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
      getSecurityUrl: creators.reducer((state, action: PayloadAction<{ isCaptcha: string }>) => {
        state.captchaUrl = action.payload.isCaptcha
      }),
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(authThunks.getAuth, authThunks.login, authThunks.logout),
      (
        state,
        action: PayloadAction<{
          isLoggedIn: boolean
        }>,
      ) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectCaptchaUrl: (state) => state.captchaUrl,
  },
})

export const authReducer = slice.reducer
export const { initializeApp, getSecurityApi, getSecurityUrl, getAuth, login, logout, isLoggin } = slice.actions
export const authThunks = { initializeApp, getSecurityApi, getSecurityUrl, getAuth, login, logout, isLoggin }
export const authSelectors = slice.selectors
