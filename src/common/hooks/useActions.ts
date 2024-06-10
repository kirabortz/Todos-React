import { useMemo } from "react"
import { bindActionCreators } from "redux"
import { useAppDispatch } from "app/model/Store"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import { authThunks } from "features/auth/model/authSlice"
import { todolistsThunks } from "features/todolistsList/model/todolistsSlice"
import { appActions } from "app/model/appSlice"

const actionsAll = { ...tasksThunks, ...todolistsThunks, ...authThunks, ...appActions }

type AllActions = typeof actionsAll
type AllActionsBindDispatch = RemapActionCreators<AllActions>

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators<AllActions, AllActionsBindDispatch>(actionsAll, dispatch), [dispatch])
}

type RemapActionCreators<T extends Record<string, any>> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>
}
