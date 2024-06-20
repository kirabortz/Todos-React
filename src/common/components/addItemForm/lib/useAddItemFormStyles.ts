import { useTheme } from '@mui/material'

type Props = {
  width: string | undefined
}

export const useAddItemFormStyles = ({ width }: Props) => {
  const theme = useTheme()
  const boxStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    '& label': {
      color: theme.palette.info.main,
    },
  }
  const textFieldStyle = {
    width: width || '100%',
  }
  const iconButtonStyle = {
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
  }

  return { boxStyle, textFieldStyle, iconButtonStyle }
}
