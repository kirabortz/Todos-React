import React, { memo, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CancelPresentation from '@mui/icons-material/CancelPresentation'
import s from 'features/todolistsList/ui/deleteModal/DeleteTodolistModal.module.css'
import { useActions } from 'common/hooks/useActions'
import IconButton from '@mui/material/IconButton'
import { useDeleteModalStyles } from 'features/todolistsList/lib/hooks/useDeleteModalStyles'

type Props = {
  id: string
  disabled: boolean
  title: string
}

export const DeleteTodolistModal = memo(({ id, disabled, title }: Props) => {
  const { deleteTodolist } = useActions()
  const {
    deleteTodolistBtnStyle,
    dialogTitleStyle,
    dialogContentTextStyle,
    dialogContentTextWarningStyle,
    deleteBtnStyle,
    cancelBtnStyle,
  } = useDeleteModalStyles()
  const [open, setOpen] = useState(false)

  const showModalHandler = () => setOpen(true)

  const hideModalHandler = (e: any) => {
    if (e.key == 'Escape') {
      setOpen(false)
    }
    setOpen(false)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist({ todoListId: id })
    setOpen(false)
  }

  return (
    <>
      <IconButton
        sx={deleteTodolistBtnStyle}
        className={s.deleteBtn}
        onClick={showModalHandler}
        disabled={disabled}
      >
        <CancelPresentation />
      </IconButton>

      <Dialog
        className={s.dialog}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={dialogTitleStyle}>
          Are you sure want to delete <span style={{ color: 'red' }}>"{title}"</span> todolist?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={dialogContentTextStyle}>
            Deletion, will result in the complete loss of all to-dos in the list.
          </DialogContentText>
          <DialogContentText className={s.deleteBtnWarning} sx={dialogContentTextWarningStyle}>
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTodolistHandler} autoFocus sx={deleteBtnStyle}>
            DELETE
          </Button>
          <Button onClick={hideModalHandler} onKeyUp={hideModalHandler} sx={cancelBtnStyle}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
})
