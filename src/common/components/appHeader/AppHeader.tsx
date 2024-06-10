import React, { memo, useEffect } from "react"
import Box from "@mui/material/Box/Box"
import { AppBar, LinearProgress, Toolbar, Typography } from "@mui/material"
import { RequestStatusType } from "common/types/types"
import { useAppSelector } from "app/model/Store"
import { authSelectors } from "features/auth/model/authSlice"
import { appSelectors } from "app/model/appSlice"
import { useNavigate } from "react-router-dom"
import { BurgerMenu } from "common/components/appHeader/burgerMenu/BurgerMenu"
import { useAppHeaderStyles } from "common/components/appHeader/lib/useAppHeaderStyles"
import { AutoComplete } from "common/components/autoComplete/AutoComplete"

type Props = {
  changeTheme: () => void
}

export const AppHeader = memo(({ changeTheme }: Props) => {
  const { boxStyle, toolBarStyle, linearProgressStyle, linkStyle } = useAppHeaderStyles()
  const navigate = useNavigate()

  const status: RequestStatusType = useAppSelector(appSelectors.selectAppStatus)
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <Box sx={boxStyle}>
        <AppBar position="static">
          <Toolbar sx={toolBarStyle}>
            <Typography variant="h5" component="div">
              <a href="/" style={{ ...linkStyle }}>
                Todos
              </a>
            </Typography>
            {isLoggedIn &&<AutoComplete />}
            <BurgerMenu changeTheme={changeTheme} />
          </Toolbar>
        </AppBar>
      </Box>
      {status === "loading" && <LinearProgress sx={linearProgressStyle} />}
    </>
  )
})
