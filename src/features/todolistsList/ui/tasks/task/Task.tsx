import React, { ChangeEvent, memo } from 'react'
import s from 'features/todolistsList/ui/tasks/task/Task.module.css'
import Checkbox from '@mui/material/Checkbox'
import PanoramaFishEye from '@mui/icons-material/PanoramaFishEye'
import TaskAlt from '@mui/icons-material/TaskAlt'
import IconButton from '@mui/material/IconButton'
import Delete from '@mui/icons-material/Delete'

import { ToggleEditMode } from 'common/components/toggleEditMode/ToggleEditMode'
import { TasksDomainProps, tasksSelectors } from 'features/todolistsList/model/tasksSlice'
import { TaskStatuses } from 'common/enums/enums'
import { useActions } from 'common/hooks/useActions'
import { Box, useTheme } from '@mui/material'
import { useTaskStyles } from 'features/todolistsList/lib/hooks/useTaskStyles'
import { useAppSelector } from 'app/model/Store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { appSelectors } from 'app/model/appSlice'

type Props = {
  task: TasksDomainProps
  listId: string
}

export const Task = memo(({ task, listId }: Props) => {
  const { deleteTask, updateTask } = useActions()
  const theme = useTheme()
  const { boxStyle, deleteBtnStyle, checkboxActiveStyle, checkboxCompletedStyle } = useTaskStyles()
  const isBlockDragMode = useAppSelector(appSelectors.isBlockDragMode)

  const filteredTasks = useAppSelector(state =>
    tasksSelectors.selectFilteredTasks(state, listId, '')
  )

  const { setNodeRef, attributes, listeners, transform, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task: filteredTasks[filteredTasks.findIndex(t => t.id === task.id)],
    },
    disabled: isBlockDragMode,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
  }

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

  const isTaskCompleted = task.status === TaskStatuses.Completed
  const isDisabledTask = task.entityStatus === 'loading'

  const styleIfDragging = {
    opacity: 0.7,
    backgroundColor: theme.palette.primary.light,
    minHeight: '40px',
  }

  return (
    <Box
      key={task.id}
      sx={boxStyle}
      className={isTaskCompleted ? s.isDone : ''}
      ref={setNodeRef}
      style={{ ...style, ...(isDragging ? styleIfDragging : {}) }}
      {...attributes}
      {...listeners}
    >
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
        variant={'standard'}
      />
      <IconButton onClick={deleteTaskHandler} disabled={isDisabledTask}>
        <Delete sx={deleteBtnStyle} className={s.taskDeleteBtn} />
      </IconButton>
    </Box>
  )
})
