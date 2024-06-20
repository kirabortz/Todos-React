import React from 'react'
import s from 'features/auth/ui/login/LoginForm.module.css'
import { Link } from 'react-router-dom'
import { useLoginStyles } from 'features/auth/lib/useLoginStyles'

export const LoginFormTitle = () => {
  const { textStyle } = useLoginStyles()

  return (
    <div className={s.containerText}>
      <span className={s.text} style={textStyle}>
        To log in get{' '}
        <Link to="https://social-network.samuraijs.com/" target={'_blank'}>
          registered
        </Link>
      </span>
      <span className={s.text} style={textStyle}>
        or click on "Email" and "Password" for using test account credentials:
      </span>
    </div>
  )
}
