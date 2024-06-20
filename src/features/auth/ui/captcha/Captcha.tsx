import React from 'react'
import s from 'features/auth/ui/login/LoginForm.module.css'
import { useActions } from 'common/hooks/useActions'

import { UseFormRegister } from 'react-hook-form'
import { LoginProps } from 'features/auth/ui/login/login.types'
import { useLoginStyles } from 'features/auth/lib/useLoginStyles'

type Props = {
  captcha: string
  register: UseFormRegister<LoginProps>
}

export const Captcha = ({ captcha, register }: Props) => {
  const { getSecurityApi } = useActions()
  const { inputStyle } = useLoginStyles()

  return (
    <div className={s.captcha}>
      <img src={captcha} alt="captcha" onClick={() => getSecurityApi()} />
      <input
        autoFocus
        placeholder="Сomplete the captcha "
        style={{ ...inputStyle }}
        {...register('captcha', { required: true })}
      />
    </div>
  )
}
