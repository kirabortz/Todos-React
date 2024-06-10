import React, { memo } from "react"
import s from "features/todolistsList/ui/todolist/Todolist.module.css"

import { DeleteTodolistModal } from "features/todolistsList/ui/deleteModal/DeleteTodolistModal"
import { ToggleEditMode } from "common/components/toggleEditMode/ToggleEditMode"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { FilterTasks } from "features/todolistsList/ui/filterTasks/FilterTasks"
import { useActions } from "common/hooks/useActions"
import { useTheme } from "@mui/material"
import { useDragDropTodolist } from "features/todolistsList/lib/hooks/useDragDropTodolist"
import { Tasks } from "features/todolistsList/ui/tasks/Tasks"
import { TodolistsDomainProps } from "features/todolistsList/model/todolistsSlice"

type Props = {
  todolist: TodolistsDomainProps
  index: number
}

export const Todolist = memo(({ todolist, index }: Props) => {
  const theme = useTheme()
  const { updateTodolist, addTask } = useActions()

  const { ref, isDragging, canDrop } = useDragDropTodolist({ todolist, index })

  const updateTitleHandler = (title: string) => {
    updateTodolist({ todoListId: todolist.id, updatedParam: { title: title } })
  }

  const addTaskHandler = (title: string) => {
    return addTask({ todoListId: todolist.id, title: title }).unwrap()
  }

  const isDisabled = todolist.entityStatus === "loading"

  return (
    <div
      ref={ref}
      key={index}
      style={{ backgroundColor: theme.palette.background.paper }}
      className={`${s.todolist} ${isDragging && s.dragging} ${canDrop && s.canDrop}`}
    >
      <DeleteTodolistModal id={todolist.id} disabled={isDisabled} title={todolist.title} />

      <ToggleEditMode onChange={updateTitleHandler} title={todolist.title} variant="filled" disabled={isDisabled} />

      <AddItemForm placeholder="Enter new task" addItem={addTaskHandler} entityStatus={isDisabled} />

      <Tasks filter={todolist.filter} todoListId={todolist.id} />

      <FilterTasks todolist={todolist} entityStatus={isDisabled} />
    </div>
  )
})
