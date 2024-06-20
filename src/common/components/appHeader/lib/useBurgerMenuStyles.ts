import { useTheme } from '@mui/material'

export const useBurgerMenuStyles = () => {
  const theme = useTheme()

  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const menuIconStyle = {
    color: theme.palette.text.secondary,
  }

  const themeModeBtnStyle = {
    color: theme.palette.secondary.dark,
  }

  const menuItemsStyle = {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',

    backgroundColor: theme.palette.primary.main,
  }

  const itemMenuStyle = {
    color: theme.palette.text.secondary,
  }
  return { boxStyle, menuIconStyle, themeModeBtnStyle, menuItemsStyle, itemMenuStyle }
}
