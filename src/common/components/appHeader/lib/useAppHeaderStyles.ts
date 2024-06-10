import { useTheme } from "@mui/material"

export const useAppHeaderStyles = () => {
  const theme = useTheme()

  const boxStyle = {
    flexGrow: 2,
  }

  const toolBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  }

  const linearProgressStyle = {
    color: theme.palette.secondary.dark,
  }

  const linkStyle = {
    color: theme.palette.text.secondary,
    textDecoration: "none",
  }
  return { linkStyle, boxStyle, toolBarStyle, linearProgressStyle }
}
