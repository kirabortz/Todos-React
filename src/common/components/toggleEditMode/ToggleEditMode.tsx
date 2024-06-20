import React, { ChangeEvent, memo, useState } from 'react'
import TextField, { TextFieldVariants } from '@mui/material/TextField'
import { useToggleEditModeStyles } from 'common/components/toggleEditMode/lib/useToggleEditModeStyles'
import { Box } from '@mui/material'

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

  const showEditMode = () => {
    setEditMode(true)
    setLocalTitle(title)
  }

  const hideEditMode = (e: any) => {
    e.key === 'Enter' || (e.type === 'blur' && (setEditMode(false), onChange(localTitle)))
  }

  const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setLocalTitle(e.currentTarget.value)
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
          onChange={updateTitleHandler}
          sx={textFieldStyle}
        />
      ) : (
        <TextField
          variant={variant || 'standard'}
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
