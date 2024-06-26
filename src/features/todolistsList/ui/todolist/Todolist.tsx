import React, { memo } from 'react'
import s from 'features/todolistsList/ui/todolist/Todolist.module.css'

import { DeleteTodolistModal } from 'features/todolistsList/ui/deleteModal/DeleteTodolistModal'
import { ToggleEditMode } from 'common/components/toggleEditMode/ToggleEditMode'
import { AddItemForm } from 'common/components/addItemForm/AddItemForm'
import { FilterTasks } from 'features/todolistsList/ui/filterTasks/FilterTasks'
import { useActions } from 'common/hooks/useActions'
import { useTheme } from '@mui/material'
import { Tasks } from 'features/todolistsList/ui/tasks/Tasks'
import { TodolistsDomainProps } from 'features/todolistsList/model/todolistsSlice'
import { CSS } from '@dnd-kit/utilities'
import { useSelector } from 'react-redux'
import { appSelectors } from 'app/model/appSlice'
import { useSortable } from '@dnd-kit/sortable'

type Props = {
  todolist: TodolistsDomainProps
}

export const Todolist = memo(({ todolist }: Props) => {
  const theme = useTheme()
  const { updateTodolist, addTask } = useActions()
  const isBlockDragMode = useSelector(appSelectors.isBlockDragMode)

  const updateTitleHandler = (title: string) => {
    updateTodolist({ todoListId: todolist.id, updatedParam: { title: title } })
  }

  const addTaskHandler = (title: string) => {
    return addTask({ todoListId: todolist.id, title: title }).unwrap()
  }
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: todolist.id,
    data: {
      type: 'Todolist',
      todolist,
    },
    disabled: isBlockDragMode,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const isDisabled = todolist.entityStatus === 'loading'

  let draggingBgColor

  if (isDragging) {
    draggingBgColor = theme.palette.primary.light
  } else if (theme.palette.mode === 'light') {
    draggingBgColor = theme.palette.background.paper
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: draggingBgColor,
      }}
      {...attributes}
      {...listeners}
      className={`${s.todolist} ${isDragging ? s.isDragging : ''}`}
    >
      <DeleteTodolistModal id={todolist.id} disabled={isDisabled} title={todolist.title} />

      <ToggleEditMode
        onChange={updateTitleHandler}
        title={todolist.title}
        variant="standard"
        disabled={isDisabled}
      />

      <AddItemForm
        placeholder="Enter new task"
        addItem={addTaskHandler}
        entityStatus={isDisabled}
      />

      <Tasks filter={todolist.filter} todoListId={todolist.id} />

      <FilterTasks todolist={todolist} entityStatus={isDisabled} />
    </div>
  )
})
