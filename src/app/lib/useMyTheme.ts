import { useState } from "react"
import { createTheme } from "@mui/material/styles"

const isDarkTheme = window?.matchMedia(`(prefers-color-scheme: dark)`).matches
const defaultTheme = isDarkTheme ? "dark" : "light"

export const useMyTheme = () => {
  const [appTheme, setAppTheme] = useState<any>(localStorage.getItem("themeMode") || defaultTheme)

  const theme = createTheme({
    palette: {
      mode: appTheme === "light" ? "light" : "dark",

      primary: {
        main: "#1D318A",
        light: "#4066ff",
      },
      secondary: {
        main: "#F2E69A",
        dark: "#FFDC00EA",
      },
      error: {
        main: "#ff0000",
      },
      success: {
        main: "#11ca11",
        dark: "#0c7a0c",
      },
      info: {
        main: "#919191",
        light: "#D8E6F1",
      },
      warning: {
        main: "#d85803",
      },
      background: {
        paper: appTheme === "light" ? "#F2E69A" : "#000000",
        default: appTheme === "light" ? "#D8E6F1" : "#000000",
      },
      text: {
        primary: appTheme === "light" ? "#000000BA" : "#ffffff",
        secondary: "#ffffff",
      },
      common: {
        black: "#000000",
        white: "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto,sans-serif",
    },
  })

  const changeModeHandler = () => {
    localStorage.setItem("themeMode", appTheme === "light" ? "dark" : "light")
    setAppTheme(localStorage.getItem("themeMode"))
  }

  return { appTheme, theme, changeModeHandler }
}
