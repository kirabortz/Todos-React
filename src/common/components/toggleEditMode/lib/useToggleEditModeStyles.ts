import { useTheme } from "@mui/material"
import { TaskStatuses } from "common/enums/enums"

type Props = {
  taskStatus: number | undefined
  variant?: "outlined" | "filled" | "standard"
}

export const useToggleEditModeStyles = ({ taskStatus, variant }: Props) => {
  const theme = useTheme()

  const textFieldStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& textarea": {
      textAlign: variant ? "center" : "left",
    },
  }
  const taskSuccessedColor = taskStatus === TaskStatuses.Completed ? theme.palette.success.dark : ""
  return { textFieldStyle, taskSuccessedColor }
}
