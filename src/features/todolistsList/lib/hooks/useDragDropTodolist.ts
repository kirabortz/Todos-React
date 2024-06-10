import { useRef } from "react"

import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd"
import { TodolistsDomainProps } from "features/todolistsList/model/todolistsSlice"

import { useActions } from "common/hooks/useActions"

export type Props = {
  todolist: TodolistsDomainProps
  index: number
}

export const useDragDropTodolist = ({ todolist, index }: Props) => {
  const { reorderTodolist } = useActions()

  const [{ canDrop }, drop] = useDrop({
    accept: "todolist",
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),

    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      // @ts-expect-error-ignore
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      /**
       * @param {hoverBoundingRect}  - Define the boundaries of the element we are over.
       * @param {hoverMiddleX} - Get the horizontal middle of an element.
       * @param {clientOffset} - Determining the cursor position.
       * @param {hoverClientX} - Get the element's moving distance.
       *
       * @returns {void}
       */

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

      /**
       * We move only when crossing half of the target element.
       * To do this, we need to check whether we are moving the element from right to left or left to right.
       */
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }

      reorderTodolist({
        startIndex: dragIndex,
        endIndex: hoverIndex,
      })

      // @ts-expect-error-ignore
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "todolist",
    item: { todolist, index },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const ref = useRef<HTMLDivElement>(null)

  drag(drop(ref))
  return { ref, isDragging, canDrop }
}
