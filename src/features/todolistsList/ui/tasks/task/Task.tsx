import React, { ChangeEvent, memo } from "react"
import s from "features/todolistsList/ui/tasks/task/Task.module.css"
import Checkbox from "@mui/material/Checkbox"
import PanoramaFishEye from "@mui/icons-material/PanoramaFishEye"
import TaskAlt from "@mui/icons-material/TaskAlt"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"

import { ToggleEditMode } from "common/components/toggleEditMode/ToggleEditMode"
import { TasksDomainProps } from "features/todolistsList/model/tasksSlice"
import { TaskStatuses } from "common/enums/enums"
import { useActions } from "common/hooks/useActions"
import { Box } from "@mui/material"
import { useDragDropTask } from "features/todolistsList/lib/hooks/useDragDropTask"
import { useTaskStyles } from "features/todolistsList/lib/hooks/useTaskStyles"

type Props = {
  task: TasksDomainProps
  index: number
  listId: string
}

export const Task = memo(({ task, index, listId }: Props) => {
  const { deleteTask, updateTask } = useActions()
  const { boxStyle, deleteBtnStyle, checkboxActiveStyle, checkboxCompletedStyle } = useTaskStyles()

  const { ref } = useDragDropTask({ task, index, listId })

  const deleteTaskHandler = () => {
    deleteTask({ todoListId: task.todoListId, taskId: task.id })
  }

  const updateStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      todoListId: task.todoListId,
      taskId: task.id,
      updatedParam: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
    })
  }

  const updateTitleHandler = (title: string) => {
    updateTask({
      todoListId: task.todoListId,
      taskId: task.id,
      updatedParam: { title: title },
    })
  }

  const isDisabledTask = task.entityStatus === "loading"

  return (
    <Box ref={ref} key={task.id} sx={boxStyle}>
      <Checkbox
        icon={<PanoramaFishEye style={checkboxActiveStyle} />}
        checkedIcon={<TaskAlt style={checkboxCompletedStyle} />}
        onChange={updateStatusHandler}
        checked={task.status === TaskStatuses.Completed}
        disabled={isDisabledTask}
      />
      <ToggleEditMode
        title={task.title}
        taskStatus={task.status}
        onChange={updateTitleHandler}
        disabled={isDisabledTask}
      />
      <IconButton onClick={deleteTaskHandler} disabled={isDisabledTask}>
        <Delete sx={deleteBtnStyle} className={s.taskDeleteBtn} />
      </IconButton>
    </Box>
  )
})
