import React from "react"
import { useAppSelector } from "app/model/Store"
import { authSelectors } from "features/auth/model/authSlice"
import s from "features/auth/ui/login/LoginForm.module.css"
import { Navigate } from "react-router-dom"
import { CheckBox } from "features/auth/ui/checkBox/CheckBox"
import { useLogin } from "features/auth/lib/useLogin"
import { Captcha } from "features/auth/ui/captcha/Captcha"
import { LoginFormTitle } from "features/auth/ui/login/LoginFormTitle"
import { LoginFields } from "features/auth/ui/login/LoginFields"
import { SubmitBtn } from "features/auth/ui/login/SubmitBtn"

export const LoginForm = () => {
  const {
    control,
    onSubmit,
    onInvalidSubmit,
    isShowPassword,
    toggleShowPass,
    trigger,
    register,
    isValid,
    setValue,
    handleSubmit,
  } = useLogin()

  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
  const captcha = useAppSelector(authSelectors.selectCaptchaUrl)

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)} className={s.form}>
      <LoginFormTitle />

      <div className={s.containerFields}>
        <LoginFields
          control={control}
          setValue={setValue}
          isShowPassword={isShowPassword}
          toggleShowPass={toggleShowPass}
          trigger={trigger}
        />

        {captcha && <Captcha captcha={captcha} register={register} />}

        <CheckBox name={"rememberMe"} control={control} />

        <SubmitBtn isValid={isValid} />
      </div>
    </form>
  )
}
