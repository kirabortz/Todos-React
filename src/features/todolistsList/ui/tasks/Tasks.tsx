import React, { memo } from "react"
import s from "features/todolistsList/ui/tasks/Tasks.module.css"
import { Task } from "features/todolistsList/ui/tasks/task/Task"
import { tasksSelectors } from "features/todolistsList/model/tasksSlice"
import { FilterValuesType } from "common/types/types"
import { useAppSelector } from "app/model/Store"

type Props = {
  filter: FilterValuesType
  todoListId: string
}

export const Tasks = memo(({ filter, todoListId }: Props) => {
  const filteredTasks = useAppSelector((state) => tasksSelectors.selectFilteredTasks(state, todoListId, filter))

  return (
    <div className={s.tasksList}>
      {filteredTasks?.map((task, index) => {
        return <Task key={task.id} task={task} index={index} listId={todoListId} />
      })}
    </div>
  )
})
