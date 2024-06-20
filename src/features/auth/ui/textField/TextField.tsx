import React, { memo } from 'react'
import s from 'features/auth/ui/textField/TextField.module.css'
import { Control, RegisterOptions, useController } from 'react-hook-form'
import { useLoginStyles } from 'features/auth/lib/useLoginStyles'
import { LoginName, LoginProps } from 'features/auth/ui/login/login.types'

type Props = {
  name: LoginName
  fieldName: 'Email' | 'Password'
  placeholder: string
  setValue?: () => void
  control: Control<LoginProps>
  rules: RegisterOptions
  type?: 'text' | 'password' | 'email'
}

export const TextField = memo(
  ({ type, name, fieldName, placeholder, setValue, control, rules }: Props) => {
    const {
      fieldState: { error },
    } = useController({ name, control, rules })

    const { inputStyle } = useLoginStyles()
    return (
      <div className={s.field}>
        <label htmlFor={name} onClick={setValue}>
          {fieldName}
        </label>
        <input
          style={{ ...inputStyle }}
          id={name}
          type={type || name}
          placeholder={placeholder}
          {...control.register(name, { ...rules })}
        />
        {error && <span className={s.error}>{error.message}</span>}
      </div>
    )
  }
)
