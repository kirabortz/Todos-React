import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useActions } from "common/hooks/useActions"
import { useTheme } from "@mui/material"

import { useState } from "react"
import { LoginProps } from "features/auth/ui/login/login.types"

export const useLogin = () => {
  const {
    control,
    register,
    clearErrors,
    setError,
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginProps>({
    mode: "onChange",
    criteriaMode: "all",
  })
  const theme = useTheme()
  const { login, getSecurityApi } = useActions()

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const toggleShowPass = () => {
    setIsShowPassword(!isShowPassword)
  }

  const onSubmit: SubmitHandler<LoginProps> = async (data: LoginProps) => {
    try {
      await login(data).unwrap()
    } catch (e: unknown) {

    }
  }

  const onInvalidSubmit: SubmitErrorHandler<LoginProps> = async (data: FieldErrors<LoginProps>) => {
    data &&
      Object.entries(data).forEach(([field, fieldData]: any) => {
        setError(field, fieldData.message)
        trigger(field)
      })
  }

  return {
    control,
    register,
    onSubmit,
    isShowPassword,
    toggleShowPass,
    onInvalidSubmit,
    clearErrors,
    errors,
    isValid,
    setValue,
    handleSubmit,
    trigger,
    getSecurityApi,
    theme,
  }
}
