import React from 'react'
import s from 'features/auth/ui/login/LoginForm.module.css'
import { TextField } from 'features/auth/ui/textField/TextField'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Control, UseFormTrigger } from 'react-hook-form'
import { LoginName, LoginProps } from 'features/auth/ui/login/login.types'
import { useLoginStyles } from 'features/auth/lib/useLoginStyles'

type Props = {
  control: Control<LoginProps>
  setValue: (name: LoginName, value: string) => void
  trigger: UseFormTrigger<LoginProps>
  isShowPassword: boolean
  toggleShowPass: () => void
}

export const LoginFields = ({
  control,
  setValue,
  trigger,
  isShowPassword,
  toggleShowPass,
}: Props) => {
  const { visibleIconStyle } = useLoginStyles()
  return (
    <div className={s.fields}>
      <TextField
        name="email"
        fieldName="Email"
        placeholder="Enter your email"
        control={control}
        setValue={() => (setValue('email', 'test.incubator.test@mail.ru'), trigger('email'))}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Email is incorrect',
          },
        }}
      />
      <TextField
        type={isShowPassword ? 'text' : 'password'}
        name="password"
        fieldName="Password"
        placeholder="Enter your password"
        control={control}
        setValue={() => (setValue('password', 'test123'), trigger('password'))}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 4,
            message: 'Password must be > 4 symbols',
          },
        }}
      />
      {isShowPassword ? (
        <VisibilityIcon sx={visibleIconStyle} onClick={toggleShowPass} />
      ) : (
        <VisibilityOffIcon sx={visibleIconStyle} onClick={toggleShowPass} />
      )}
    </div>
  )
}
