import { useAppSelector } from "app/model/Store"
import { TodolistsDomainProps, todolistsSelectors } from "features/todolistsList/model/todolistsSlice"
import { useActions } from "common/hooks/useActions"
import { SyntheticEvent, useEffect, useState } from "react"


export const useAutoComplete = () => {
  const todolists = useAppSelector(todolistsSelectors.selectTodolists)
  const { updateFilteredTodos } = useActions()

  const [selectedTodos, setSelectedTodos] = useState<TodolistsDomainProps[]>([])

  const availableTodos = todolists.filter((todo) => !selectedTodos.some((selectedTodo) => selectedTodo.id === todo.id))

  useEffect(() => {
    const selectedIds = new Set(selectedTodos.map((todo) => todo.id))
    const newSelectedTodos = todolists.filter((todo) => selectedIds.has(todo.id))

    if (newSelectedTodos.length !== selectedTodos.length) {
      setSelectedTodos(newSelectedTodos)
      updateFilteredTodos({ filteredTodos: newSelectedTodos })
    }
  }, [todolists, selectedTodos])

  const selectTodosHandler = (e: SyntheticEvent<Element, Event>, todos: TodolistsDomainProps[]) => {
    setSelectedTodos(todos)
    updateFilteredTodos({ filteredTodos: todos })
  }

  return { availableTodos, selectedTodos, selectTodosHandler }
}
