import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { FilterValuesType } from "common/types/types"
import { useActions } from "common/hooks/useActions"
import { TodolistsDomainProps } from "features/todolistsList/model/todolistsSlice"
import s from "features/todolistsList/ui/filterTasks/FilterTasks.module.css"
import { useFilterTasksStyles } from "features/todolistsList/lib/hooks/useFilterTasksStyles"

type Props = {
  todolist: TodolistsDomainProps
  entityStatus: boolean
}

export const FilterTasks = memo(({ todolist, entityStatus }: Props) => {
  const { updateTodolist } = useActions()
  const { nameStyle } = useFilterTasksStyles()
  const updateFilterHandler = (filterName: FilterValuesType) => {
    updateTodolist({ todoListId: todolist.id, updatedParam: { filter: filterName } })
  }

  return (
    <Grid container justifyContent="center" padding={3}>
      <Grid item padding={0.5}>
        <Button
          variant={todolist.filter === "all" ? "contained" : "text"}
          onClick={() => updateFilterHandler("all")}
          disabled={entityStatus}
        >
          <span className={s.name} style={{ color: nameStyle("all") }}>
            all
          </span>
        </Button>
      </Grid>
      <Grid item padding={0.5}>
        <Button
          variant={todolist.filter === "active" ? "contained" : "text"}
          onClick={() => updateFilterHandler("active")}
          disabled={entityStatus}
        >
          <span className={s.name} style={{ color: nameStyle("active") }}>
            active
          </span>
        </Button>
      </Grid>
      <Grid item padding={0.5}>
        <Button
          variant={todolist.filter === "completed" ? "contained" : "text"}
          onClick={() => updateFilterHandler("completed")}
          disabled={entityStatus}
        >
          <span className={s.name} style={{ color: nameStyle("completed") }}>
            completed
          </span>
        </Button>
      </Grid>
    </Grid>
  )
})
