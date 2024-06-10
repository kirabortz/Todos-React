import React from "react"
import s from "app/ui/App.module.css"

import { AppHeader } from "common/components/appHeader/AppHeader"
import CircularProgress from "@mui/material/CircularProgress"
import { ErrorSnackBar } from "common/components/errorSnackBar/ErrorSnackBar"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline/CssBaseline"
import { Routing } from "app/routing/Routing"
import { useMyTheme } from "app/lib/useMyTheme"
import { useApp } from "app/lib/useApp"

const App = () => {
  const { theme, changeModeHandler } = useMyTheme()
  const { isInitialized } = useApp({ theme })

  if (!isInitialized) {
    return (
      <div className={s.initializeContainer}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.app}>
        <ErrorSnackBar />
        <AppHeader changeTheme={changeModeHandler} />
        <Routing />
      </div>
    </ThemeProvider>
  )
}

export default App
