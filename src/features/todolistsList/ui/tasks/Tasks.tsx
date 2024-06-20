import React, { memo, useMemo } from 'react'
import s from 'features/todolistsList/ui/tasks/Tasks.module.css'
import { Task } from 'features/todolistsList/ui/tasks/task/Task'
import { tasksSelectors } from 'features/todolistsList/model/tasksSlice'
import { FilterValuesType } from 'common/types/types'
import { useAppSelector } from 'app/model/Store'
import { SortableContext } from '@dnd-kit/sortable'

type Props = {
  filter: FilterValuesType
  todoListId: string
}

export const Tasks = memo(({ filter, todoListId }: Props) => {
  const filteredTasks = useAppSelector(state =>
    tasksSelectors.selectFilteredTasks(state, todoListId, filter)
  )

  let tasksIds = useMemo(() => filteredTasks?.map(task => task.id), [filteredTasks])

  return (
    tasksIds && (
      <SortableContext items={tasksIds}>
        <div className={s.tasksList}>
          {filteredTasks?.map(task => <Task key={task.id} task={task} listId={todoListId} />)}
        </div>
      </SortableContext>
    )
  )
})
