import React, { useMemo } from 'react'
import s from 'features/todolistsList/ui/TodolistsList.module.css'

import { useAppSelector } from 'app/model/Store'
import { AddItemForm } from 'common/components/addItemForm/AddItemForm'
import { Navigate } from 'react-router-dom'
import { todolistsSelectors } from 'features/todolistsList/model/todolistsSlice'
import { authSelectors } from 'features/auth/model/authSlice'
import { useActions } from 'common/hooks/useActions'
import { Todolist } from 'features/todolistsList/ui/todolist/Todolist'
import { Pagination } from 'common/components/pagination/Pagination'
import { Paginate } from 'common/utils/Paginate'
import { DndContextHOC } from 'features/todolistsList/dnd/DndContextHOC'
import { SortableContext } from '@dnd-kit/sortable'

export const TodolistsList = () => {
  const { addTodolist } = useActions()

  const isLoggedIn: boolean = useAppSelector(authSelectors.selectIsLoggedIn)
  const todolists = useAppSelector(todolistsSelectors.selectGetFilteredTodolists)
  const todolistIds = useMemo(() => todolists?.map(tl => tl.id), [todolists])

  const currentPage = useAppSelector(todolistsSelectors.selectCurrentPage)
  const pageSize = useAppSelector(todolistsSelectors.selectPageSize)

  const addTodolistHandler = (title: string) => {
    return addTodolist({ title }).unwrap()
  }

  const todolistsCrop = Paginate(todolists, currentPage, pageSize)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <DndContextHOC>
      <AddItemForm placeholder="Enter new Todolist name" addItem={addTodolistHandler} width="50%" />
      <Pagination currentPage={currentPage} pageSize={pageSize} itemsLength={todolists.length} />
      <div className={s.todolistsList}>
        <SortableContext items={todolistIds}>
          {todolistsCrop?.map(todolist => {
            return <Todolist todolist={todolist} key={todolist.id} />
          })}
        </SortableContext>
      </div>
    </DndContextHOC>
  )
}
