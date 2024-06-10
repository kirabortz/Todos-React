import { useTheme } from "@mui/material"

export const useLoginStyles = () => {
  const theme = useTheme()

  const textStyle = {
    color: theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white,
  }
  const inputStyle = theme.palette.mode === "light" && { border: `1px solid ${theme.palette.primary.main}` }

  const visibleIconStyle = {
    position: "absolute",
    bottom: "8px",
    right: "4px",
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:active": {
      color: theme.palette.secondary.dark,
    },
  }

  const submitBtnStyle = (isValid: boolean) => {
    return isValid && theme.palette.mode === "light"
      ? { cursor: "pointer", border: "1px solid grey" }
      : !isValid
        ? { cursor: "not-allowed" }
        : { cursor: "pointer" }
  }
  return { textStyle, inputStyle, visibleIconStyle, submitBtnStyle }
}
