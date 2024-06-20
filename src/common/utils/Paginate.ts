import { TodolistsDomainProps } from 'features/todolistsList/model/todolistsSlice'

export const Paginate = (
  items: TodolistsDomainProps[],
  currentPage: number,
  pageSize: number
): TodolistsDomainProps[] => {
  const startIndex = (currentPage - 1) * pageSize
  return [...items].splice(startIndex, pageSize)
}
