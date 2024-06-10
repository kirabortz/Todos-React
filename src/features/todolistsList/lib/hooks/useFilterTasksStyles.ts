import { useTheme } from "@mui/material"
import { FilterValuesType } from "common/types/types"

export const useFilterTasksStyles = () => {
  const theme = useTheme()

  const btnStyle = {
    color: theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.secondary.main,
  }
  const nameStyle = (filterName: FilterValuesType) => {
    return filterName === "all"
      ? theme.palette.info.light
      : filterName === "active"
        ? theme.palette.error.main
        : theme.palette.success.main
  }
  return { btnStyle, nameStyle }
}
