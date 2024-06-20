import { useTheme } from '@mui/material'

export const useAutoCompleteStyles = () => {
  const theme = useTheme()

  const textFieldStyle = {
    root: {
      '& .MuiOutlinedInput-root': {
        color: theme.palette.text.secondary,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.secondary.light,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.secondary.light,
        },
      },
    },
  }

  return { textFieldStyle }
}
