import { useTheme } from '@mui/material'

export const useDeleteModalStyles = () => {
  const theme = useTheme()
  const deleteTodolistBtnStyle = {
    position: 'absolute',
    right: '5px',
    top: '5px',
    zIndex: '5',
    cursor: 'pointer',
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.light,
  }

  const dialogTitleStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    textAlign: 'center',
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.dark,
  }
  const dialogContentTextStyle = {
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.dark,
  }
  const dialogContentTextWarningStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.palette.error.main,
  }
  const deleteBtnStyle = {
    color: theme.palette.error.main,
  }
  const cancelBtnStyle = {
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.dark,
  }

  return {
    deleteTodolistBtnStyle,
    dialogTitleStyle,
    dialogContentTextStyle,
    dialogContentTextWarningStyle,
    deleteBtnStyle,
    cancelBtnStyle,
  }
}
