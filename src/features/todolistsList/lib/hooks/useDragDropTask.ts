import { useRef } from "react"
import { TasksDomainProps } from "features/todolistsList/model/tasksSlice"
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd"
import { useActions } from "common/hooks/useActions"

type Props = {
  task: TasksDomainProps
  index: number
  listId: string
}

export const useDragDropTask = ({ task, index, listId }: Props) => {
  const { reorderedTask } = useActions()

  const [, drop] = useDrop({
    accept: "task",
    collect() {},
    drop(item, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      // @ts-expect-error-ignore
      const dragIndex = item.index
      const hoverIndex = index
      const endListId = listId

      if (dragIndex === hoverIndex) {
        return
      }

      /**
       * @param {hoverBoundingRect}  - Defining the rectangular border of a hover element .
       * @param {hoverMiddleY} - Determining the vertical middle.
       * @param {clientOffset} - Determining the cursor position.
       * @param {hoverClientY} - Defining pixels to the top edge of the hover element.
       *
       * @returns {void}
       */
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      /**
       * If we drag down and just crossed the middle, we interrupt
       */
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      /**
       * If we drag up and do not cross the middle, we interrupt
       */
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      reorderedTask({
        // @ts-expect-error-ignore
        todoListId: item.task.todoListId,
        // @ts-expect-error-ignore
        taskId: item.task.id,
        endListId: endListId,
        startIndex: dragIndex,
        endIndex: hoverIndex,
      })

      // @ts-expect-error-ignore
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: "task",
    item: { task, index },
  })
  const ref = useRef<HTMLDivElement>(null)
  drag(drop(ref))

  return { ref }
}
