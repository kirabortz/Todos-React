import React, { ChangeEvent, memo, useState } from 'react'
import TextField, { TextFieldVariants } from '@mui/material/TextField'
import { useToggleEditModeStyles } from 'common/components/toggleEditMode/lib/useToggleEditModeStyles'
import { Box } from '@mui/material'
import { appActions } from 'app/model/appSlice'
import { useAppDispatch } from 'app/model/Store'

type Props = {
  onChange: (title: string) => void
  title: string
  variant?: TextFieldVariants | undefined
  taskStatus?: number
  disabled?: boolean
}

export const ToggleEditMode = memo(({ onChange, title, variant, taskStatus, disabled }: Props) => {
  const { textFieldStyle, taskSuccessedColor } = useToggleEditModeStyles({ taskStatus, variant })
  let [editMode, setEditMode] = useState(false)
  let [localTitle, setLocalTitle] = useState('')
  const dispatch = useAppDispatch()
  const showEditMode = () => {
    setEditMode(true)
    setLocalTitle(title)
  }

  const hideEditMode = (e: any) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      dispatch(appActions.changeBlockDragMode({ isBlockDragMode: false }))

      setEditMode(false)
      onChange(localTitle.trim())
    }
  }

  const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setLocalTitle(e.currentTarget.value)
  const onFocusHandler = () => {
    dispatch(appActions.changeBlockDragMode({ isBlockDragMode: true }))
  }
  return (
    <Box>
      {editMode ? (
        <TextField
          variant="outlined"
          autoFocus
          multiline
          value={localTitle}
          disabled={disabled}
          onBlur={hideEditMode}
          onKeyUp={hideEditMode}
          onFocus={onFocusHandler}
          onChange={updateTitleHandler}
          sx={textFieldStyle}
        />
      ) : (
        <TextField
          variant={variant || 'outlined'}
          inputProps={{ style: { color: taskSuccessedColor } }}
          value={title}
          multiline
          onDoubleClick={showEditMode}
          disabled={disabled}
          sx={textFieldStyle}
        />
      )}
    </Box>
  )
})
