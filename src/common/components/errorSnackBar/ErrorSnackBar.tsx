import React, { memo } from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppSelector } from 'app/model/Store'
import { appSelectors } from 'app/model/appSlice'
import { useActions } from 'common/hooks/useActions'

export const ErrorSnackBar = memo(() => {
  const error = useAppSelector(appSelectors.selectAppError)

  const { setAppError } = useActions()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return

    setAppError({ error: null })
  }

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
})
