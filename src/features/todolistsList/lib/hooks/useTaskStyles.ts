import { useTheme } from '@mui/material'

export const useTaskStyles = () => {
  const theme = useTheme()
  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: '5px',
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main}`,
  }
  const deleteBtnStyle = {
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
  }
  const checkboxActiveStyle = {
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
  }
  const checkboxCompletedStyle = {
    color: theme.palette.success.main,
  }

  return { boxStyle, deleteBtnStyle, checkboxActiveStyle, checkboxCompletedStyle }
}
