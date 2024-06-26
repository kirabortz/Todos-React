import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { createPortal } from 'react-dom'

import { useSelector } from 'react-redux'
import React from 'react'
import { dndSelectors } from 'features/todolistsList/dnd/dndSlice'
import { useAppSelector } from 'app/model/Store'
import { useActions } from 'common/hooks/useActions'
import { Todolist } from 'features/todolistsList/ui/todolist/Todolist'
import { Task } from 'features/todolistsList/ui/tasks/task/Task'
import { tasksSelectors } from 'features/todolistsList/model/tasksSlice'

export const DndContextHOC = (props: { children: React.ReactNode }) => {
  const activeTodo = useSelector(dndSelectors.activeTodo)
  const activeTask = useSelector(dndSelectors.activeTask)
  const memoActiveTodoId = useSelector(dndSelectors.memoActiveTodoId)
  const memoOverTodoId = useSelector(dndSelectors.memoOverTodoId)
  const memoActiveTaskCopy = useSelector(dndSelectors.memoActiveTaskCopy)
  const tasks = useAppSelector(tasksSelectors.tasksState)
  const {
    reorderTodolist,
    reorderTodolistTC,
    updateTaskDnDTC,
    addTaskDnDTC,
    deleteTask,
    reorderTask,
    reorderTaskTC,
    reorderTaskAcrossTodosTC,
    moveTaskAcrossTodolists,
    fetchTasks,
    addTask,
    moveTaskInEmptyTodolists,
    setActiveTodo,
    setActiveTask,
    setMemoActiveTodoId,
    setMemoOverTodoId,
    setMemoActiveTaskCopy,
  } = useActions()
  const onDragStartHandler = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Todolist') {
      setActiveTodo(event.active.data.current.todolist)
      return
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      event.active.data.current.todoListId = event.active.data.current.task.todoListId
      return
    }
  }
  const onDragOverHandler = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    let activeTodoListId = active.data.current?.todolist?.id
    const activeTaskId = active.data.current?.task?.id
    let overTodoListId = over.data.current?.todolist?.id
    const overTaskId = over.data.current?.task?.id
    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'
    const isActiveATodolist = active.data.current?.type === 'Todolist'
    const isOverATodolist = over.data.current?.type === 'Todolist'

    if (isActiveATask && isOverATask && activeTodoListId === overTodoListId) {
      activeTodoListId = active.data.current?.task?.todoListId
      overTodoListId = over.data.current?.task?.todoListId

      reorderTask({
        todoListId: activeTodoListId,
        startDragId: activeTaskId,
        endShiftId: overTaskId,
      })
    }

    if (isActiveATask && isOverATask && activeTodoListId !== overTodoListId) {
      activeTodoListId = active.data.current?.task?.todoListId
      overTodoListId = over.data.current?.task?.todoListId
      if (activeTaskId === overTaskId) return
      setMemoActiveTodoId(activeTodoListId)
      setMemoOverTodoId(overTodoListId.toString())
      moveTaskAcrossTodolists({
        todoListId: activeTodoListId,
        endTodoListId: overTodoListId,
        startDragId: activeTaskId,
        endShiftId: overTodoListId,
      })
    }

    if (isActiveATask && isOverATodolist && tasks[overTodoListId]?.length === 0) {
      activeTodoListId = active.data.current?.task?.todoListId
      overTodoListId = over.data.current?.todolist.id
      setMemoActiveTodoId(activeTodoListId)
      setMemoOverTodoId(overTodoListId)
      setMemoActiveTaskCopy(active.data.current?.task)
      moveTaskInEmptyTodolists({
        todoListId: activeTodoListId,
        endTodoListId: overTodoListId,
        startDragId: activeTaskId,
      })
    }

    if (isActiveATodolist && isOverATodolist) {
      activeTodoListId = active?.data.current?.todolist.id
      overTodoListId = over?.data.current?.todolist.id
      setMemoOverTodoId(overTodoListId)
      setMemoActiveTodoId(activeTodoListId)
      if (activeTodo) {
        reorderTodolist({
          endShiftId: overTodoListId,
          startDragId: activeTodo.id,
        })
      }
    }
  }

  const onDragEndHandler = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const activeTaskId = active.data.current?.task?.id
    let overTodoListId = over.data.current?.todolist?.id
    const overTaskId = over.data.current?.task?.id
    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'
    const isActiveATodolist = active.data.current?.type === 'Todolist'
    const isOverATodolist = over.data.current?.type === 'Todolist'
    if (isActiveATask && isOverATask && memoActiveTodoId === memoOverTodoId) {
      reorderTaskTC({
        todoListId: activeTask?.todoListId || '',
        startDragId: activeTaskId,
        endShiftId: overTaskId,
      })
    }

    if (isActiveATask && isOverATask && memoActiveTodoId !== memoOverTodoId) {
      overTodoListId = over.data.current?.task?.todoListId
      const activeCopy = active.data.current?.task

      reorderTask({
        todoListId: overTodoListId,
        startDragId: activeTaskId,
        endShiftId: overTaskId,
      })
      let newTask

      deleteTask({
        todoListId: activeTask?.todoListId || '',
        taskId: activeTaskId,
      }).then(() => {
        if (overTodoListId) {
          addTaskDnDTC({
            todoListId: overTodoListId,
            title: activeCopy.title,
          })
            .then(res => {
              if (res.payload && 'task' in res.payload) {
                newTask = res.payload.task
                return newTask
              }
            })
            .then(newTask => {
              if (newTask) {
                const { id, todoListId, order, addedDate, ...model } = activeCopy
                updateTaskDnDTC({
                  todoListId: memoOverTodoId || '',
                  task: newTask,
                  model: { ...model },
                }).then(() => {
                  reorderTaskAcrossTodosTC({
                    todoListId: overTodoListId,
                    startDragId: newTask.id,
                    endShiftId: activeTaskId,
                  }).then(() => {
                    fetchTasks({ todoListId: overTodoListId })
                    fetchTasks({ todoListId: memoActiveTodoId || '' })
                  })
                })
              }
            })
        }
      })
    }

    if (isActiveATask && isOverATodolist && tasks[overTodoListId]?.length === 0) {
      const activeCopy = memoActiveTaskCopy
      deleteTask({
        todoListId: activeTask?.todoListId || '',
        taskId: activeTaskId,
      }).then(() => {
        if (activeCopy) {
          addTask({
            todoListId: overTodoListId,
            title: activeCopy.title,
          })
        }
      })
    }
    if (isActiveATodolist && isOverATodolist) {
      const startDragId = memoActiveTodoId || ''
      const endShiftId = memoOverTodoId
      reorderTodolistTC({ endShiftId, startDragId })
    }
    setActiveTodo(null)
    setActiveTask(null)
    setMemoActiveTodoId(null)
    setMemoOverTodoId(null)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 15 },
    })
  )

  return (
    <DndContext
      onDragStart={onDragStartHandler}
      onDragOver={onDragOverHandler}
      onDragEnd={onDragEndHandler}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      {props.children}
      {createPortal(
        <DragOverlay style={{ cursor: 'grabbing' }}>
          {activeTodo && (
            <div>
              <Todolist key={activeTodo.id} todolist={activeTodo} />
            </div>
          )}
          {activeTask && (
            <Task key={activeTask.id} task={activeTask} listId={activeTask.todoListId} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
