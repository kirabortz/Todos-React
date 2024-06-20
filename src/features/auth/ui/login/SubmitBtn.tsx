import React from 'react'
import s from 'features/auth/ui/login/LoginForm.module.css'
import { useLoginStyles } from 'features/auth/lib/useLoginStyles'

export type SubmitBtnProps = {
  isValid: boolean
}

export const SubmitBtn = ({ isValid }: SubmitBtnProps) => {
  const { submitBtnStyle } = useLoginStyles()

  return (
    <div
      className={!isValid ? s.tooltipContainer : ''}
      data-tooltip={!isValid && 'First enter the correct data in form fields'}
    >
      <button className={s.submit} disabled={!isValid} style={submitBtnStyle(isValid)}>
        Log In
      </button>
    </div>
  )
}
