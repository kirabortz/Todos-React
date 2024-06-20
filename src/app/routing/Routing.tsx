import React, { memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from 'features/todolistsList/ui/TodolistsList'
import { LoginForm } from 'features/auth/ui/login/LoginForm'
import { UnknownPage } from 'common/components/unknownPage/UnknownPage'

export const Routing = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<TodolistsList />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/404" element={<UnknownPage />} />
      <Route path="*" element={<Navigate to={'/404'} />} />
    </Routes>
  )
})
